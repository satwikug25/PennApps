import React, { useState, useEffect } from 'react';
import { withAuthInfo, useLogoutFunction, useRedirectFunctions } from '@propelauth/react';
import axios from 'axios';

const Accounts = withAuthInfo(({ user }) => {
  const [accounts, setAccounts] = useState([]);
  const logoutFunction = useLogoutFunction();
  const { redirectToAccountPage } = useRedirectFunctions();

  // useEffect(() => {
  //   const fetchAccounts = async () => {
  //     try {
  //       const response = await axios.get('/api/accounts'); // Replace with actual API call
  //       setAccounts(response.data);
  //     } catch (error) {
  //       console.error('Error fetching accounts:', error);
  //     }
  //   };
  //   fetchAccounts();
  // }, []);

  const handleNewAccount = () => {
    redirectToAccountPage();
  };

  return (
    <section style={styles.accounts}>
      <h2 style={styles.title}>Your Accounts</h2>
      {accounts.length > 0 ? (
        <div style={styles.accountGrid}>
          {accounts.map((account) => (
            <div key={account._id} style={styles.accountCard} onClick={() => alert(`Viewing account: ${account.nickname}`)}>
              <h3 style={styles.accountTitle}>{account.nickname}</h3>
              <p style={styles.accountBalance}>Balance: {account.balance}</p>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noAccounts}>No accounts available.</p>
      )}
      <button onClick={handleNewAccount} style={styles.createButton}>Create New Account</button>
      <br /><br />
      <button onClick={logoutFunction} style={styles.logoutButton}>Logout</button>
    </section>
  );
});

const styles = {
  accounts: {
    padding: '4rem 2rem',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.8rem',
    marginBottom: '3rem',
    color: '#333',
  },
  accountGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '2rem',
  },
  accountCard: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
    textAlign: 'left',
  },
  accountCardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 25px rgba(0, 0, 0, 0.2)',
  },
  accountTitle: {
    fontSize: '1.5rem',
    color: '#4e54c8',
  },
  accountBalance: {
    fontSize: '1.2rem',
    color: '#666',
    marginTop: '1rem',
  },
  noAccounts: {
    fontSize: '1.3rem',
    color: '#777',
    marginBottom: '2rem',
  },
  createButton: {
    backgroundColor: '#4e54c8',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    fontSize: '1.2rem',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
  createButtonHover: {
    backgroundColor: '#393fb1',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    color: '#666',
    border: '1px solid #666',
    padding: '0.8rem 2rem',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '5px',
    marginTop: '1rem',
    transition: 'background-color 0.3s, color 0.3s',
  },
  logoutButtonHover: {
    backgroundColor: '#666',
    color: 'white',
  },
};

export default Accounts;
