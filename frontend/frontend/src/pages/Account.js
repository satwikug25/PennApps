import React, { useState, useEffect } from 'react';
import { withAuthInfo, useLogoutFunction, useRedirectFunctions } from '@propelauth/react';
import axios from 'axios';

const Account = withAuthInfo((props) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [transferAmount, setTransferAmount] = useState('');
  const [recipientAccount, setRecipientAccount] = useState('');
  const [payeeId, setPayeeId] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [newAccountNickname, setNewAccountNickname] = useState('');
  const [newAccountType, setNewAccountType] = useState('');
  const [newAccountNumber, setNewAccountNumber] = useState('');
  const [newAccountBalance, setNewAccountBalance] = useState(null);
  const [newAccountRewards, setNewAccountRewards] = useState(null);
  const logoutFunction = useLogoutFunction();
  const { redirectToAccountPage } = useRedirectFunctions();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const customerId = localStorage.getItem('customerId');
        const response = await axios.get('http://127.0.0.1:5000/get_accounts_by_customer_id/'+ customerId );
        
        console.log(response)
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
    fetchAccounts();
  }, [accounts]);

  const handleNewAccount = () => {
    setShowAccountForm(!showAccountForm); // Toggle the form visibility
  };

  const handleAccountCreation = async () => {
    const customerId = localStorage.getItem('customerId');
    try {
      const response = await axios.post(`http://127.0.0.1:5000/create_account/${customerId}`, {
        type: newAccountType,
        nickname: newAccountNickname,
        rewards: parseInt(newAccountRewards),
        balance: parseInt(newAccountBalance),
        account_number: newAccountNumber,
      });
      alert('Account created successfully!');
      setAccounts([...accounts, response.data]);
      setShowAccountForm(false);
    } catch (error) {
      console.error('Error creating account:', error);
      alert('Account creation failed.');
    }
  };

  const handleTransfer = async (senderId) => {
    try {
      const response = await axios.post(`http://127.0.0.1:5001/transfer-money/`, {
        senderId,
        recipientAccountId: payeeId,
        amount: transferAmount,
      });
      alert('Transfer successful!');
    } catch (error) {
      console.error('Error making transfer:', error);
      alert('Transfer failed.');
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
                    placeholder="Payee ID"
                    value={payeeId}
                    onChange={(e) => setPayeeId(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Transaction Date"
                    value={transactionDate}
                    onChange={(e) => setTransactionDate(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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

      <button onClick={handleNewAccount} style={styles.createButton}>
        {showAccountForm ? 'Hide Create Account Form' : 'Create New Account'}
      </button>

      {showAccountForm && (
        <div style={styles.accountForm}>
          <h4>Create New Account</h4>
          <input
            type="text"
            placeholder="Account Nickname"
            value={newAccountNickname}
            onChange={(e) => setNewAccountNickname(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Account Number"
            value={newAccountNumber}
            onChange={(e) => setNewAccountNumber(e.target.value)}
            style={styles.input}
          />
          <select value={newAccountType} onChange={(e) => setNewAccountType(e.target.value)} style={styles.input}>
            <option value="Credit Card">Credit Card</option>
            <option value="Checking">Checking</option>
            <option value="Savings">Savings</option>
          </select>
          <input
            type="number"
            placeholder="Balance"
            value={newAccountBalance}
            onChange={(e) => setNewAccountBalance(e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Rewards"
            value={newAccountRewards}
            onChange={(e) => setNewAccountRewards(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleAccountCreation} style={styles.createButton}>
            Create Account
          </button>
        </div>
      )}

      <br /><br />
      <button onClick={async () => await logoutFunction(true)} style={styles.logoutButton}>
        Logout
      </button>
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
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    justifyContent: 'space-between',
  },
  accountCard: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: '400px',
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
  accountForm: {
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
  },
  logoutButton: {
    backgroundColor: 'transparent',
    color: '#666',
    border: '1px solid #666',
    padding: '0.8rem'
  }
}

export default Account