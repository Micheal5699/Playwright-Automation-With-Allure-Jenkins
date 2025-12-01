pipeline {
    agent any
    
    tools {
        nodejs 'node.js'
    }
    
    environment {
        CI = 'true'
    }
    
    parameters {
        string(name: 'TEST_FILE', defaultValue: '', description: 'Specify the test file to run (without extension)')
        string(name: 'BROWSER', defaultValue: '', description: 'Specify the browser project (e.g., chromium, firefox, webkit)')
    }

    stages {
        stage('Hello World') {
            steps {
                echo '================================================'
                echo '    🎉 JENKINSFILE IS WORKING! 🎉'
                echo '================================================'
                echo "This is build number: ${env.BUILD_NUMBER}"
                echo "Workspace location: ${env.WORKSPACE}"
            }
        }

        stage('Checkout') {
            steps {
                echo '=== Checking out code ==='
                checkout scm
                sh 'dir'
            }
        }

        stage('Verify System Dependencies') {
            steps {
                sh '''
                    echo "=== Checking system libraries ==="
                    ldconfig -p | grep libatomic || echo "⚠️ libatomic not found"
                    
                    # Install if missing (requires sudo)
                    if ! ldconfig -p | grep -q libatomic; then
                        echo "Installing libatomic..."
                        sudo apt-get update && echo "$SUDO_PASSWORD" | sudo -S apt-get install -y libatomic1

                    fi
                '''
            }
        }

        stage('Verify Node') {
            steps {
                echo '=== Checking Node.js ==='
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '=== Installing dependencies ==='
                sh 'npm ci'
                
                sh 'npx playwright install'

            }
        }

        stage('Run Tests') {
            steps {
                script {
                    def testCmd = "npx playwright test --reporter=line,allure-playwright"
                    if (params.BROWSER?.trim()) {
                        testCmd += " --project=${params.BROWSER}"
                        echo "Browser parameter provided: ${params.BROWSER}"
                    }
                    if (params.TEST_FILE?.trim()) {
                        testCmd += " tests/${params.TEST_FILE}.spec.js"
                        echo "Test file parameter provided: ${params.TEST_FILE}"
                    } else {
                        echo "No test file parameter provided, running all tests"
                    }
                    echo "Executing: ${testCmd}"
                    sh testCmd
                }
            }
        }
    }

    post {
        always {
            echo '=== Publishing and Junit reports ==='
            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']],
                reportBuildPolicy: 'ALWAYS',
                commandline: 'allure'
            ])
            junit(
                testResults: 'test-results/**/*.xml',
                allowEmptyResults: true,
                keepLongStdio: true
            )
            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
        }
        success {
            script {
                try {
                    echo '✅ Pipeline completed successfully! Sending success email...'
                    mail(
                        to: 'adeolu@summitech.io',
                        subject: "✅ SUCCESS: Allure Report for Job ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                        body: """
                            The QA automation tests passed successfully!

                            Project: ${env.JOB_NAME}
                            Build: #${env.BUILD_NUMBER}
                            Status: SUCCESS

                            Link to Allure Report: ${env.BUILD_URL}allure/
                            Link to Build: ${env.BUILD_URL}
                        """
                    )
                } catch (Exception e) {
                    echo "⚠️ Failed to send success email: ${e.message}"
                }
            }
        }
        failure {
            script {
                try {
                    echo '❌ Pipeline failed! Sending failure email...'
                    mail(
                        to: 'latop@live.com',
                        cc: 'adeolu@summitech.io',
                        subject: "❌ FAILURE: Allure Report for Job ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                        body: """
                            The QA automation tests failed. Immediate investigation is required.

                            Project: ${env.JOB_NAME}
                            Build: #${env.BUILD_NUMBER}
                            Status: FAILURE

                            Link to Allure Report: ${env.BUILD_URL}allure/
                            Link to Build: ${env.BUILD_URL}
                        """
                    )
                } catch (Exception e) {
                    echo "⚠️ Failed to send failure email: ${e.message}"
                }
            }
        }
    }
}