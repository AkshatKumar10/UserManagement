pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/AkshatKumar10/UserManagement.git'
            }
        }

        stage('Deploy') {
            steps {
                bat '''
                    docker-compose down
                    docker-compose up -d --build
                '''
            }
        }

        stage('Verify') {
            steps {
                bat 'docker ps'
            }
        }

    }
}