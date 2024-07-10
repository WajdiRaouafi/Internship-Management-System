pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'https://index.docker.io/v1/'
        DOCKER_IMAGE = 'wajdiraouafi/ims'
        DOCKER_TAG = 'latest' // You can change this to your desired tag
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials' // The ID of your Docker credentials in Jenkins
        DB_HOST = 'mysql' // DATABASE10
        DB_PORT = '3306'
        DB_NAME = 'Internship-Management-System'
        DB_USER = 'root'
        DB_PASSWORD = 'password'
    }
    tools {
        jdk 'OpenJDK17'
        maven 'Maven3'
    }

    stages {
        // stage('Checkout') {
        //     steps {
        //         checkout scmGit(branches: [[name: '*/wajdi']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/WajdiRaouafi/Internship-Management-System']])
        //     }
        // }

        stage('Build') {
            steps {
                // Build the project using Maven
                sh 'mvn clean package -DskipTests'
            }
        }

        // stage('Test') {
        //     steps {
        //         // Run tests using Maven
        //         sh 'mvn test'
        //     }
        // }

        stage('Build Docker Image') {
            steps {
                // Build Docker image
                script {
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} -f docker/backend/Dockerfile ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                // Push Docker image to registry
                script {
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh "echo \$DOCKER_PASSWORD | docker login ${DOCKER_REGISTRY} -u \$DOCKER_USERNAME --password-stdin"
                        sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                // Deploy the application using Docker Compose
                script {
                    sh 'docker-compose down'
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            cleanWs()   // Clean up workspace after the build
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure  {
            echo 'Pipeline execution failed'
        }
    }
}
