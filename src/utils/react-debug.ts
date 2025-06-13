// Debug utility to check React version and detect duplicate instances
export const checkReactVersion = () => {
  try {
    const React = require('react');
    console.log('React version:', React.version);
    console.log('React instance:', React);
    
    // Check if React.createElement is available
    if (typeof React.createElement !== 'function') {
      console.error('React.createElement is not a function - possible React version conflict');
    }
    
    // Check for ReactCurrentOwner
    const ReactInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    if (!ReactInternals) {
      console.error('React internals not found - possible React version conflict');
    } else {
      console.log('React internals found:', Object.keys(ReactInternals));
    }
    
    return true;
  } catch (error) {
    console.error('Error checking React version:', error);
    return false;
  }
};

// Call this in development to debug React issues
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  checkReactVersion();
}
