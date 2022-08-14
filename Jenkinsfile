def BUILDER   = "key.json"
def project   = "submission-adi-purnomo"
def appName   = "body-mass-index"
def CODE_REPO = "https://github.com/medival/body-mass-index.git"

pipeline {
  agent {
    kubernetes {
      cloud "metaverse-cluster"
      label "jenkins-agent"
      defaultContainer "jnlp"
      yaml """
        apiVersion: v1
        kind: Pod
        spec:
          serviceAccountName: jenkins
          containers:
            - name: gcloud
              image: gcr.io/cloud-builders/gcloud
              imagePullPolicy: IfNotPresent
              command: ['cat']
              tty: true
            - name: kubectl
              image: gcr.io/cloud-builders/kubectl
              imagePullPolicy: IfNotPresent
              command: ['cat']
              tty: true
            - name: helm
              image: alpine/helm:3.9.3
              imagePullPolicy: IfNotPresent
              command: ['cat']
              tty: true
            - name: jnlp
              image: jenkins/jnlp-agent-docker:latest
              imagePullPolicy: IfNotPresent
      """
    }
  }

  stages {
    stage("Clone") {
      environment {
        SOURCE_CODE = "https://github.com/medival/body-mass-index.git"
      } 
      steps {
        container("jnlp") {
          checkout([
            $class: 'GitSCM', 
             branches: [[ name: params.BRANCH]],
             extensions: [], 
            userRemoteConfigs: [[url: "${SOURCE_CODE}"]]
          ])
        }
      }
    }
    stage("Build") {
      environment {
        IMAGE_REPO = "asia.gcr.io/${project}/${appName}"
      } 
      steps {
        withCredentials([string(credentialsId: "${BUILDER}" , variable: "builder")]) {
          container("kubectl") {
            sh "curl -O ${builder}"
            sh "gcloud auth activate-service-account --key-file=key.json"
            sh "gcloud builds submit --project ${project} -t ${IMAGE_REPO}:${appName}-${BUILD_NUMBER}"
          }
        }
      }
    }
    stage("Deploy") {
      environment {
        IMAGE_REPO = "asia.gcr.io/${project}/${appName}"
      }
      steps {
        container("helm") {
          sh "sed -i 's/latest/${appName}-${BUILD_NUMBER}/g' helm/body-mass-index/templates/deployment.yaml"
          sh "cat helm/body-mass-index/templates/deployment.yaml"
          sh """
            helm upgrade ${appName} ./helm/${appName} --debug --install --namespace default
          """
        }
      }
    }
  }
}
