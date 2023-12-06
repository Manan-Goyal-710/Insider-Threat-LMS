pipeline {
    // Telling Jenkins to run the pipeline on any available agent.
    agent any
    options {
        skipDefaultCheckout(true)
    }
    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Manan-Goyal-710/Insider-Threat-LMS.git'
            }
        }
        
        // This stage is telling Jenkins to run in the frontend directory and backend directory.
        stage('Install Dependencies') {
            steps {
                dir('client') {
                    bat 'npm.cmd install'
                }
                  dir('server') {
                    bat 'npm.cmd install'
                }
            }
        }
       
        
        // This stage is telling Jenkins to build the images for the frontend.
        stage('Build Frontend and Backend Images') {
            steps {
                script {
                    bat 'docker build -t manangoyal/calculator:frontend client'
                    bat 'docker build -t manangoyal/calculator:backend server'
                }
            }
        }
        // This stage is pushing images to dockerhub.
        stage('Push Images to Hub') {
            steps {
                withDockerRegistry([ credentialsId: "manan-dockerhub", url: "" ]) {
                    bat 'docker push manangoyal/calculator:frontend'
                    bat 'docker push manangoyal/calculator:backend'
                }
            }
        }
    }
    post {
        always {
            // This block will always be executed, regardless of the build result
            bat 'docker logout'
        }
        failure {
            emailext(
                attachLog: true,
                body: '''<html>
                        <p>The build failed. Please check the Jenkins console output for details.</p>
                        <p>Build URL: ${BUILD_URL}</p>
                        </html>''',
                subject: 'Build Failure',
                to: 'gurchet.bawa20@st.niituniversity.in, latika.sharma20@st.niituniversity.in',
                mimeType: 'text/html'
            )
        }
        success {
            emailext(
                attachLog: true,
                body: 'The build was successful.',
                subject: 'Build Success',
                to: 'gurchet.bawa20@st.niituniversity.in,manan.goyal20@st.niituniversity.in, latika.sharma20@st.niituniversity.in',
                mimeType: 'text/html'
            )
        }
    }
}
