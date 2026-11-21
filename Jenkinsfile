
pipeline {
    agent any

    environment {
        CI = 'true'
    }

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo 'Downloading code from GitHub'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies'
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                echo 'Installing Chromium, Firefox and WebKit'
                bat 'npx playwright install'
            }
        }

        stage('Execute Playwright Tests') {
            steps {
                echo 'Executing Playwright tests'
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'playwright-report/**, test-results/**',
                allowEmptyArchive: true
            )
        }

        success {
            echo 'All Playwright tests passed!'
        }

        failure {
            echo 'Playwright execution failed!'
        }
    }
}
