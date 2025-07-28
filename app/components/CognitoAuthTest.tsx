"use client"

import "@/amplify" // Import Amplify configuration first
import { useState } from 'react'
import { signIn, signUp, getCurrentUser, signOut, confirmSignUp } from '@aws-amplify/auth'

export default function CognitoAuthTest() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmCode, setConfirmCode] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  const handleSignUp = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
          },
        },
      });

      if (isSignUpComplete) {
        setMessage('Account created successfully! You can now sign in.')
        setShowConfirm(false)
      } else if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        setMessage('Account created! Please enter the confirmation code sent to your email.')
        setShowConfirm(true)
      }
    } catch (error: any) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmSignUp = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      await confirmSignUp({
        username: email,
        confirmationCode: confirmCode,
      });
      setMessage('Account confirmed successfully! You can now sign in.')
      setShowConfirm(false)
    } catch (error: any) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const { isSignedIn, nextStep } = await signIn({ username: email, password });
      
      if (isSignedIn) {
        setMessage('Successfully signed in!')
        await checkCurrentUser()
      } else if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
        setMessage('Please check your email and confirm your account before signing in.')
      } else {
        setMessage('Invalid email or password.')
      }
    } catch (error: any) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      await signOut()
      setMessage('Successfully signed out!')
      setCurrentUser(null)
    } catch (error: any) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const checkCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
      setMessage(`Current user: ${user.userId}`)
    } catch (error: any) {
      setMessage(`No authenticated user: ${error.message}`)
      setCurrentUser(null)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AWS Cognito Authentication Test</h1>
      
      <div className="max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded bg-background text-foreground"
            placeholder="Enter email"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded bg-background text-foreground"
            placeholder="Enter password (min 8 chars)"
          />
        </div>

        {showConfirm && (
          <div>
            <label className="block text-sm font-medium mb-2">Confirmation Code:</label>
            <input
              type="text"
              value={confirmCode}
              onChange={(e) => setConfirmCode(e.target.value)}
              className="w-full p-2 border rounded bg-background text-foreground"
              placeholder="Enter code from email"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <button
            onClick={handleSignUp}
            disabled={loading}
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Sign Up'}
          </button>
          
          {showConfirm && (
            <button
              onClick={handleConfirmSignUp}
              disabled={loading}
              className="w-full p-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Confirm Sign Up'}
            </button>
          )}
          
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Sign In'}
          </button>
          
          <button
            onClick={checkCurrentUser}
            disabled={loading}
            className="w-full p-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Get Current User'}
          </button>

          {currentUser && (
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Sign Out'}
            </button>
          )}
        </div>
        
        {message && (
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
            <p className="text-sm">{message}</p>
          </div>
        )}

        {currentUser && (
          <div className="p-4 bg-green-100 dark:bg-green-800 rounded">
            <h3 className="font-bold mb-2">Current User:</h3>
            <p className="text-sm">User ID: {currentUser.userId}</p>
            <p className="text-sm">Username: {currentUser.username}</p>
          </div>
        )}
      </div>
    </div>
  )
} 