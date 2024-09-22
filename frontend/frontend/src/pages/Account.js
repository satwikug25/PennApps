import React, { useState, useEffect } from 'react';
import { withAuthInfo, useLogoutFunction, useRedirectFunctions } from '@propelauth/react';
import axios from 'axios';

const Accounts = withAuthInfo((props) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null); // New state for selected account
  const [transferAmount, setTransferAmount] = useState('');
  const [recipientAccount, setRecipientAccount] = useState('');
  const logoutFunction = useLogoutFunction();
  const { redirectToAccountPage } = useRedirectFunctions();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const customerId = localStorage.getItem('customerId');
        const response = await axios.get(`/customers/${customerId}/accounts`); // Replace with actual API call
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
    fetchAccounts();
  }, []);

  const handleNewAccount = () => {
    redirectToAccountPage();
  };

  const handleTransfer = async (accountId) => {
    try {
      const response = await axios.post(`/accounts/${accountId}/transfers`, {
        medium: 'balance',
        payee_id: recipientAccount,
        amount: transferAmount,
        transaction_date: new Date().toISOString(),
        description: 'Money transfer'
      });
      alert('Transfer successful!');
    } catch (error) {
      console.error('Error making transfer:', error);
      alert('Transfer failed');
    }
  };

  return (
    <section style={styles.accounts}>
      <h2 style={styles.title}>Your Accounts</h2>
      {accounts.length > 0 ? (
        <div style={styles.accountGrid}>
          {accounts.map((account) => (
            <div key={account._id} style={styles.accountCard} onClick={() => setSelectedAccount(account)}>
              <h3 style={styles.accountTitle}>{account.nickname}</h3>
              <p style={styles.accountBalance}>Balance: {account.balance}</p>

              {selectedAccount && selectedAccount._id === account._id && (
                <div style={styles.transferForm}>
                  <h4>Transfer Money</h4>
                  <input
                    type="text"
                    placeholder="Recipient Account ID"
                    value={recipientAccount}
                    onChange={(e) => setRecipientAccount(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="number"
                    placeholder="Amount"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    style={styles.input}
                  />
                  <button onClick={() => handleTransfer(account._id)} style={styles.createButton}>
                    Transfer Money
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noAccounts}>No accounts available.</p>
      )}
      <button onClick={handleNewAccount} style={styles.createButton}>Create New Account</button>
      <br /><br />
      <button onClick={async () => await logoutFunction(true)} style={styles.logoutButton}>Logout</button>
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
  transferForm: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    margin: '0.5rem 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  }
};

export default Accounts;
