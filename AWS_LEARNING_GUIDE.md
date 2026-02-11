# AWS Services Learning Guide for Guild Role

## Quick Start Checklist

### Phase 1: Setup (Day 1)
- [ ] Create AWS Free Tier account at aws.amazon.com
- [ ] Set up AWS CLI: `brew install awscli` (Mac) or follow AWS docs
- [ ] Configure credentials: `aws configure`
- [ ] Verify setup: `aws sts get-caller-identity`
- [ ] Enable MFA for root account (security best practice)

### Phase 2: Core Serverless (Week 1)
- [ ] Complete AWS Lambda "Getting Started" tutorial
- [ ] Build API Gateway + Lambda integration
- [ ] Practice S3 file operations
- [ ] Build file upload API project

### Phase 3: Event-Driven (Week 2)
- [ ] Create EventBridge rules
- [ ] Set up SQS queues
- [ ] Build event-driven workflow project

### Phase 4: ETL (Week 3)
- [ ] Explore AWS Glue console
- [ ] Build CSV processing pipeline
- [ ] Practice data transformation

### Phase 5: Infrastructure (Week 4)
- [ ] Install AWS CDK: `npm install -g aws-cdk`
- [ ] Deploy first CDK stack
- [ ] Convert projects to CDK

---

## Phase 1: Core Serverless Services

### Project 1: Simple REST API

**Goal:** API Gateway → Lambda → DynamoDB

**Steps:**
1. Create DynamoDB table (via console or CLI)
2. Create Lambda function with DynamoDB access
3. Create API Gateway endpoint
4. Test the API

**Lambda Function Template:**
```javascript
// handler.js
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { id } = event.pathParameters || {};
    
    try {
        const result = await dynamodb.get({
            TableName: 'YourTableName',
            Key: { id }
        }).promise();
        
        return {
            statusCode: 200,
            body: JSON.stringify(result.Item)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
```

### Project 2: S3 File Processor

**Goal:** S3 → Lambda → Process → DynamoDB

**Steps:**
1. Create S3 bucket
2. Create Lambda function triggered by S3 events
3. Process uploaded files
4. Store metadata in DynamoDB

**Lambda Function Template:**
```javascript
// handler.js
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    for (const record of event.Records) {
        const bucket = record.s3.bucket.name;
        const key = record.s3.object.key;
        
        // Get file from S3
        const file = await s3.getObject({ Bucket: bucket, Key: key }).promise();
        const content = file.Body.toString();
        
        // Process file (example: parse CSV)
        const processed = processFile(content);
        
        // Store in DynamoDB
        await dynamodb.put({
            TableName: 'ProcessedFiles',
            Item: {
                id: key,
                processedAt: new Date().toISOString(),
                data: processed
            }
        }).promise();
    }
};

function processFile(content) {
    // Your processing logic here
    return { processed: true };
}
```

---

## Phase 2: Event-Driven Architecture

### Project 3: Event-Driven Data Processor

**Architecture:**
EventBridge → Lambda → SQS → Lambda → S3

**Steps:**
1. Create EventBridge rule
2. Create Lambda function (processor)
3. Create SQS queue
4. Create Lambda function (consumer)
5. Set up dead-letter queue

**EventBridge Rule Pattern:**
```json
{
  "source": ["custom.myapp"],
  "detail-type": ["Data Processing Request"]
}
```

**Lambda Processor:**
```javascript
// processor.js
const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

exports.handler = async (event) => {
    const data = event.detail;
    
    // Process data
    const result = processData(data);
    
    // Send to SQS
    await sqs.sendMessage({
        QueueUrl: process.env.QUEUE_URL,
        MessageBody: JSON.stringify(result)
    }).promise();
};
```

**Lambda Consumer:**
```javascript
// consumer.js
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
    for (const record of event.Records) {
        const message = JSON.parse(record.body);
        
        // Final processing
        const final = finalizeData(message);
        
        // Store in S3
        await s3.putObject({
            Bucket: process.env.OUTPUT_BUCKET,
            Key: `results/${Date.now()}.json`,
            Body: JSON.stringify(final)
        }).promise();
    }
};
```

---

## Phase 3: ETL and Data Processing

### Project 4: CSV Processing Pipeline

**Architecture:**
S3 (CSV) → Lambda/Glue → Transform → DynamoDB/S3

**Lambda ETL Function:**
```python
# handler.py
import boto3
import pandas as pd
import json

s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    # Extract
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    
    obj = s3.get_object(Bucket=bucket, Key=key)
    df = pd.read_csv(obj['Body'])
    
    # Transform
    df = clean_data(df)
    df = validate_data(df)
    
    # Load
    table = dynamodb.Table('ProcessedData')
    for _, row in df.iterrows():
        table.put_item(Item=row.to_dict())
    
    return {'statusCode': 200, 'body': 'Processed successfully'}
```

---

## Phase 4: Infrastructure as Code

### Project 5: CDK Stack

**Setup:**
```bash
npm install -g aws-cdk
cdk init app --language typescript
```

**CDK Stack Template:**
```typescript
// lib/etl-stack.ts
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class EtlStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB Table
    const table = new dynamodb.Table(this, 'DataTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    // S3 Bucket
    const bucket = new s3.Bucket(this, 'DataBucket', {
      versioned: true,
    });

    // Lambda Function
    const handler = new lambda.Function(this, 'EtlHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        TABLE_NAME: table.tableName,
        BUCKET_NAME: bucket.bucketName,
      },
    });

    // Grant permissions
    table.grantReadWriteData(handler);
    bucket.grantReadWrite(handler);

    // API Gateway
    new apigateway.LambdaRestApi(this, 'EtlApi', {
      handler: handler,
    });
  }
}
```

---

## Guild-Specific Practice Scenarios

### Scenario 1: Eligibility Processing System

**Requirements:**
- REST API to receive employee data
- Process eligibility rules
- Store results
- Send notifications

**Implementation:**
1. API Gateway endpoint: `POST /eligibility`
2. Lambda function processes eligibility rules
3. Store in DynamoDB
4. Publish to EventBridge for notifications

### Scenario 2: Data Onboarding Pipeline

**Requirements:**
- Accept CSV files
- Transform and validate
- Load to database
- Error handling

**Implementation:**
1. S3 bucket for uploads
2. Lambda triggered on S3 upload
3. Process CSV with pandas (Python) or similar
4. Validate data
5. Load to DynamoDB or PostgreSQL
6. SQS for error handling

---

## Key Commands Reference

### AWS CLI
```bash
# Configure
aws configure

# Lambda
aws lambda create-function --function-name my-function --runtime nodejs18.x --role arn:aws:iam::...

# S3
aws s3 cp file.csv s3://my-bucket/
aws s3 ls s3://my-bucket/

# DynamoDB
aws dynamodb create-table --table-name MyTable --attribute-definitions AttributeName=id,AttributeType=S --key-schema AttributeName=id,KeyType=HASH --billing-mode PAY_PER_REQUEST

# CDK
cdk init app --language typescript
cdk deploy
cdk destroy
```

### Testing Locally
```bash
# Install SAM CLI for local Lambda testing
brew install aws-sam-cli

# Test Lambda locally
sam local invoke MyFunction

# Test API Gateway locally
sam local start-api
```

---

## Cost Optimization Tips

- Use AWS Free Tier (12 months)
- Delete resources when not in use
- Use DynamoDB on-demand billing for development
- Set up billing alerts
- Use S3 lifecycle policies
- Monitor CloudWatch for unused resources

---

## Troubleshooting

### Common Issues

**Lambda timeout:**
- Increase timeout in function configuration
- Optimize code performance
- Consider Step Functions for long-running tasks

**Permission errors:**
- Check IAM roles and policies
- Verify resource ARNs
- Check service limits

**Cold starts:**
- Use provisioned concurrency for critical functions
- Optimize package size
- Consider container images for large dependencies

---

## Next Steps After Learning

1. Build a complete project combining all services
2. Add monitoring and alerting
3. Implement error handling and retries
4. Add security best practices
5. Document architecture decisions
6. Prepare to discuss in interviews

---

## Resources

- **AWS Documentation:** docs.aws.amazon.com
- **AWS Workshops:** workshops.aws
- **AWS re:Invent:** YouTube channel
- **AWS Skill Builder:** skillbuilder.aws (free courses)
- **AWS Well-Architected Framework:** For best practices
