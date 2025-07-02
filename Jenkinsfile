pipeline {
    agent any

    environment {
        // Adjust Node version as needed for your Playwright compatibility
        NODE_VERSION = '18'  // Playwright typically works well with LTS versions
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}/browsers"
    }

    stages {
        stage('Setup Environment') {
            steps {
                script {
                    // For macOS agents with Homebrew pre-installed
                    if (isUnix()) {
                        sh '''
                            # Add Homebrew to PATH (adjust path based on your agent)
                            export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"

                            # Install Node.js using Homebrew
                            brew install node@${NODE_VERSION}

                            # Link Node.js (Homebrew specific)
                            brew link --overwrite node@${NODE_VERSION}

                            # Add to PATH for subsequent steps
                            export PATH="/usr/local/opt/node@${NODE_VERSION}/bin:$PATH"
                        '''
                    } else {
                        error('This pipeline is designed for macOS/Linux agents with Homebrew')
                    }
                }
            }
        }

        stage('Install Playwright') {
            steps {
                sh '''
                    echo "Node version: $(node --version)"
                    echo "NPM version: $(npm --version)"

                    # Install project dependencies
                    npm install

                    # Install Playwright browsers (will use the custom location)
                    npx playwright install

                    # Optional: Install Playwright dependencies
                    npx playwright install-deps
                '''
            }
        }

        stage('Run Tests') {
            steps {
                sh '''
                    # Run your Playwright tests
                    npx playwright test

                    # Generate report if needed
                    npx playwright show-report
                '''
            }
        }
    }

    post {
        always {
            // Archive test results if you're using JUnit-style reports
            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
        }
    }
}