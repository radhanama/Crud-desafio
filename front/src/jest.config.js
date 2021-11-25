const config = {
    "setupFilesAfterEnv": [
        "<rootDir>/src/setuptests.ts"
      ]
      
  };
  
  module.exports = config;
  
  // Or async function
  module.exports = async () => {
    return {
      verbose: true,
    };
  };

