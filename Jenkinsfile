pipeline {
    agent any

    environment {
        KUBECONFIG = credentials('kubeconfig')
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                url: 'https://github.com/AkshatKumar10/UserManagement.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                docker build -t user-backend:latest ./server
                docker build -t user-frontend:latest ./client
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl apply -f k8s/
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                kubectl get pods
                kubectl get services
                '''
            }
        }
    }
}