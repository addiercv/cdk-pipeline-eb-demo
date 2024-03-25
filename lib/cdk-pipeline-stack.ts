import { CodePipeline, CodePipelineSource, ShellStep } from "aws-cdk-lib/pipelines"; 
import { Construct } from "constructs"; 
import { Stack, StackProps } from "aws-cdk-lib"; 
import { Pipeline } from "aws-cdk-lib/aws-codepipeline";

/**
 * The stack tat defines the application pipeline 
 */ 
export class CdkPipelineStack extends Stack { 
    constructor(scope: Construct, id: string, props?:StackProps) { 
        super(scope, id, props); 

        const pipeline = new CodePipeline(this, 'Pipeline', { 
            // The pipeline name 
            pipelineName: 'MyServicePipeline', 

            // How it will be built and synthesized 
            synth: new ShellStep('Synth', { 
                // Where the source can be found 
                input: CodePipelineSource.gitHub('addiercv/cdk-pipeline-eb.demo', 'main'), 

                // Install dependencies, build and run cdk synth 
                installCommands: ['npm i -g npm@latest'], 
                commands: [ 
                    'npm ci', 
                    'npm run build', 
                    'npx cdk synth'
                ], 
            }), 
        }); 

        // Application stages 
    }
}