# Python ETL Pipeline Project Plan

## Project Overview

Build a production-ready ETL (Extract, Transform, Load) pipeline using Python that demonstrates skills relevant to the Guild Senior Software Engineer role. This project will process CSV files, transform data, and load it into a database, all using AWS serverless architecture.

## Project Goals

- Demonstrate Python proficiency for backend development
- Show ETL pipeline development experience
- Integrate with AWS services (S3, Lambda, DynamoDB)
- Implement error handling, logging, and testing
- Create a portfolio-worthy project

## Technology Stack

- **Language:** Python 3.11+
- **AWS Services:** Lambda, S3, DynamoDB, CloudWatch
- **Libraries:** boto3 (AWS SDK), pandas (data processing), pytest (testing)
- **Infrastructure:** AWS CDK or Serverless Framework (optional)

## Project Structure

```
python-etl-pipeline/
├── src/
│   ├── __init__.py
│   ├── extract.py          # Extract data from S3
│   ├── transform.py         # Transform/clean data
│   ├── load.py             # Load data to DynamoDB
│   ├── handler.py          # Lambda handler (main entry point)
│   └── utils/
│       ├── __init__.py
│       ├── logger.py       # Logging configuration
│       └── validators.py   # Data validation functions
├── tests/
│   ├── __init__.py
│   ├── test_extract.py
│   ├── test_transform.py
│   ├── test_load.py
│   └── test_handler.py
├── data/
│   └── sample.csv          # Sample CSV for testing
├── requirements.txt
├── README.md
├── .gitignore
└── template.yaml            # SAM template (optional)
```

## Implementation Phases

### Phase 1: Project Setup and Foundation

**Tasks:**
1. Create project directory structure
2. Set up Python virtual environment
3. Install dependencies (boto3, pandas, pytest)
4. Create basic file structure
5. Set up logging configuration
6. Create sample CSV data file

**Deliverables:**
- Project structure created
- Virtual environment configured
- Dependencies installed
- Basic logging setup
- Sample data file

### Phase 2: Extract Module

**Tasks:**
1. Create `extract.py` module
2. Implement S3 file reading function
3. Parse CSV files using pandas
4. Handle different CSV formats
5. Error handling for missing files
6. Unit tests for extract functions

**Function Signature:**
```python
def extract_from_s3(bucket_name: str, file_key: str) -> pd.DataFrame:
    """
    Extract CSV data from S3 bucket.
    
    Args:
        bucket_name: Name of S3 bucket
        file_key: Key/path of file in S3
    
    Returns:
        pandas DataFrame with extracted data
    
    Raises:
        S3Error: If file cannot be read from S3
        ValueError: If CSV cannot be parsed
    """
    pass
```

**Requirements:**
- Use boto3 to connect to S3
- Handle S3 access errors
- Parse CSV with pandas
- Return DataFrame
- Log extraction steps

### Phase 3: Transform Module

**Tasks:**
1. Create `transform.py` module
2. Implement data cleaning functions
3. Data validation and type conversion
4. Handle missing values
5. Data enrichment (if applicable)
6. Unit tests for transform functions

**Function Signature:**
```python
def transform_data(df: pd.DataFrame, config: dict) -> pd.DataFrame:
    """
    Transform and clean data according to business rules.
    
    Args:
        df: Raw DataFrame from extract
        config: Transformation configuration
    
    Returns:
        Cleaned and transformed DataFrame
    
    Raises:
        ValidationError: If data fails validation
    """
    pass
```

**Transformation Requirements:**
- Remove duplicates
- Handle null/missing values
- Type conversion (strings to dates, numbers, etc.)
- Data validation (email format, phone numbers, etc.)
- Standardize formats (dates, names, etc.)
- Calculate derived fields (if applicable)

### Phase 4: Load Module

**Tasks:**
1. Create `load.py` module
2. Implement DynamoDB write function
3. Batch write operations
4. Handle write errors and retries
5. Data format conversion for DynamoDB
6. Unit tests for load functions

**Function Signature:**
```python
def load_to_dynamodb(df: pd.DataFrame, table_name: str) -> dict:
    """
    Load transformed data to DynamoDB table.
    
    Args:
        df: Transformed DataFrame
        table_name: DynamoDB table name
    
    Returns:
        Dictionary with load statistics (records_loaded, errors)
    
    Raises:
        DynamoDBError: If write operations fail
    """
    pass
```

**Requirements:**
- Convert DataFrame rows to DynamoDB items
- Batch write (25 items per batch max)
- Handle write errors gracefully
- Return statistics
- Log load progress

### Phase 5: Lambda Handler

**Tasks:**
1. Create `handler.py` (main Lambda handler
2. Orchestrate extract → transform → load
3. Error handling and recovery
4. Return appropriate responses
5. Logging throughout pipeline
6. Integration tests

**Function Signature:**
```python
def lambda_handler(event: dict, context: object) -> dict:
    """
    AWS Lambda handler for ETL pipeline.
    
    Args:
        event: Lambda event (contains S3 bucket and key)
        context: Lambda context
    
    Returns:
        Response dictionary with status and statistics
    """
    pass
```

**Event Structure:**
```json
{
  "Records": [
    {
      "s3": {
        "bucket": {"name": "my-bucket"},
        "object": {"key": "data/file.csv"}
      }
    }
  ]
}
```

**Response Structure:**
```json
{
  "statusCode": 200,
  "records_processed": 150,
  "records_loaded": 148,
  "errors": 2,
  "execution_time_seconds": 12.5
}
```

### Phase 6: Testing

**Tasks:**
1. Unit tests for each module
2. Integration tests for full pipeline
3. Mock AWS services (moto library)
4. Test error scenarios
5. Achieve >80% code coverage
6. Set up pytest configuration

**Test Requirements:**
- Test extract with various CSV formats
- Test transform with edge cases
- Test load with different data sizes
- Test error handling
- Test Lambda handler end-to-end

### Phase 7: AWS Deployment

**Tasks:**
1. Create Lambda deployment package
2. Set up IAM roles and permissions
3. Configure S3 trigger for Lambda
4. Create DynamoDB table
5. Deploy to AWS (via console or CDK)
6. Test deployed pipeline

**IAM Permissions Needed:**
- S3: Read access to source bucket
- DynamoDB: Write access to target table
- CloudWatch: Logging permissions

### Phase 8: Documentation and Polish

**Tasks:**
1. Write comprehensive README
2. Document architecture and design decisions
3. Add code comments
4. Create deployment guide
5. Add usage examples
6. Prepare for portfolio showcase

## Detailed Implementation Steps

### Step 1: Project Initialization

```bash
# Create project directory
mkdir python-etl-pipeline
cd python-etl-pipeline

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Mac/Linux
# venv\Scripts\activate  # On Windows

# Create directory structure
mkdir -p src/utils tests data

# Initialize files
touch src/__init__.py src/extract.py src/transform.py src/load.py src/handler.py
touch src/utils/__init__.py src/utils/logger.py src/utils/validators.py
touch tests/__init__.py tests/test_extract.py tests/test_transform.py tests/test_load.py tests/test_handler.py
touch requirements.txt README.md .gitignore
```

### Step 2: Dependencies

**requirements.txt:**
```
boto3>=1.34.0
pandas>=2.1.0
pytest>=7.4.0
pytest-cov>=4.1.0
moto>=4.2.0  # For mocking AWS services
python-dotenv>=1.0.0  # For environment variables
```

### Step 3: Sample Data

**data/sample.csv:**
```csv
employee_id,first_name,last_name,email,department,hire_date,salary
E001,John,Doe,john.doe@example.com,Engineering,2020-01-15,75000
E002,Jane,Smith,jane.smith@example.com,Marketing,2019-03-20,65000
E003,Bob,Johnson,bob.johnson@example.com,Sales,2021-06-10,70000
```

### Step 4: Core Implementation Files

**src/utils/logger.py:**
```python
import logging
import sys

def setup_logger(name: str = __name__) -> logging.Logger:
    """Configure and return a logger instance."""
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)
    
    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)
    
    return logger
```

**src/utils/validators.py:**
```python
import re
from datetime import datetime

def validate_email(email: str) -> bool:
    """Validate email format."""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

def validate_date(date_string: str, format: str = '%Y-%m-%d') -> bool:
    """Validate date format."""
    try:
        datetime.strptime(date_string, format)
        return True
    except ValueError:
        return False

def clean_phone(phone: str) -> str:
    """Clean and format phone number."""
    # Remove non-digits
    digits = re.sub(r'\D', '', phone)
    # Format as (XXX) XXX-XXXX
    if len(digits) == 10:
        return f"({digits[:3]}) {digits[3:6]}-{digits[6:]}"
    return phone
```

**src/extract.py:**
```python
import boto3
import pandas as pd
from typing import Optional
from src.utils.logger import setup_logger

logger = setup_logger(__name__)
s3_client = boto3.client('s3')

def extract_from_s3(bucket_name: str, file_key: str) -> pd.DataFrame:
    """
    Extract CSV data from S3 bucket.
    
    Args:
        bucket_name: Name of S3 bucket
        file_key: Key/path of file in S3
    
    Returns:
        pandas DataFrame with extracted data
    
    Raises:
        Exception: If extraction fails
    """
    try:
        logger.info(f"Extracting file from S3: s3://{bucket_name}/{file_key}")
        
        # Get object from S3
        response = s3_client.get_object(Bucket=bucket_name, Key=file_key)
        
        # Read CSV into DataFrame
        df = pd.read_csv(response['Body'])
        
        logger.info(f"Successfully extracted {len(df)} rows from S3")
        return df
        
    except Exception as e:
        logger.error(f"Error extracting from S3: {str(e)}")
        raise
```

**src/transform.py:**
```python
import pandas as pd
from typing import Dict, Any
from src.utils.logger import setup_logger
from src.utils.validators import validate_email, validate_date, clean_phone

logger = setup_logger(__name__)

def transform_data(df: pd.DataFrame, config: Dict[str, Any] = None) -> pd.DataFrame:
    """
    Transform and clean data according to business rules.
    
    Args:
        df: Raw DataFrame from extract
        config: Optional transformation configuration
    
    Returns:
        Cleaned and transformed DataFrame
    """
    logger.info("Starting data transformation")
    df = df.copy()
    
    # Remove duplicates
    initial_count = len(df)
    df = df.drop_duplicates()
    logger.info(f"Removed {initial_count - len(df)} duplicate rows")
    
    # Handle missing values
    df = handle_missing_values(df)
    
    # Type conversions
    df = convert_types(df)
    
    # Data validation
    df = validate_data(df)
    
    # Standardize formats
    df = standardize_formats(df)
    
    logger.info(f"Transformation complete. Final row count: {len(df)}")
    return df

def handle_missing_values(df: pd.DataFrame) -> pd.DataFrame:
    """Handle missing/null values."""
    # Fill numeric columns with 0 or median
    numeric_cols = df.select_dtypes(include=['number']).columns
    df[numeric_cols] = df[numeric_cols].fillna(0)
    
    # Fill string columns with empty string
    string_cols = df.select_dtypes(include=['object']).columns
    df[string_cols] = df[string_cols].fillna('')
    
    return df

def convert_types(df: pd.DataFrame) -> pd.DataFrame:
    """Convert data types."""
    # Convert date columns
    if 'hire_date' in df.columns:
        df['hire_date'] = pd.to_datetime(df['hire_date'], errors='coerce')
    
    # Convert numeric columns
    if 'salary' in df.columns:
        df['salary'] = pd.to_numeric(df['salary'], errors='coerce')
    
    return df

def validate_data(df: pd.DataFrame) -> pd.DataFrame:
    """Validate data quality."""
    # Validate emails
    if 'email' in df.columns:
        invalid_emails = ~df['email'].apply(validate_email)
        if invalid_emails.any():
            logger.warning(f"Found {invalid_emails.sum()} invalid emails")
            # Optionally remove invalid rows or flag them
            # df = df[~invalid_emails]
    
    return df

def standardize_formats(df: pd.DataFrame) -> pd.DataFrame:
    """Standardize data formats."""
    # Standardize names (title case)
    if 'first_name' in df.columns:
        df['first_name'] = df['first_name'].str.title()
    if 'last_name' in df.columns:
        df['last_name'] = df['last_name'].str.title()
    
    # Standardize email (lowercase)
    if 'email' in df.columns:
        df['email'] = df['email'].str.lower()
    
    return df
```

**src/load.py:**
```python
import boto3
from typing import Dict, List
import pandas as pd
from src.utils.logger import setup_logger

logger = setup_logger(__name__)
dynamodb = boto3.resource('dynamodb')

def load_to_dynamodb(df: pd.DataFrame, table_name: str) -> Dict[str, int]:
    """
    Load transformed data to DynamoDB table.
    
    Args:
        df: Transformed DataFrame
        table_name: DynamoDB table name
    
    Returns:
        Dictionary with load statistics
    """
    logger.info(f"Loading {len(df)} records to DynamoDB table: {table_name}")
    table = dynamodb.Table(table_name)
    
    records_loaded = 0
    errors = 0
    
    # Convert DataFrame to list of dictionaries
    items = df_to_dynamodb_items(df)
    
    # Batch write (DynamoDB allows max 25 items per batch)
    batch_size = 25
    for i in range(0, len(items), batch_size):
        batch = items[i:i + batch_size]
        
        try:
            with table.batch_writer() as writer:
                for item in batch:
                    writer.put_item(Item=item)
                    records_loaded += 1
            logger.info(f"Loaded batch {i//batch_size + 1}: {len(batch)} items")
        except Exception as e:
            logger.error(f"Error loading batch: {str(e)}")
            errors += len(batch)
    
    logger.info(f"Load complete. Loaded: {records_loaded}, Errors: {errors}")
    return {
        'records_loaded': records_loaded,
        'errors': errors,
        'total_records': len(df)
    }

def df_to_dynamodb_items(df: pd.DataFrame) -> List[Dict]:
    """Convert DataFrame to DynamoDB item format."""
    items = []
    
    for _, row in df.iterrows():
        item = {}
        for col in df.columns:
            value = row[col]
            
            # Handle different data types
            if pd.isna(value):
                continue  # Skip null values
            elif isinstance(value, pd.Timestamp):
                item[col] = value.isoformat()
            elif isinstance(value, (int, float)):
                item[col] = str(value) if col == 'employee_id' else value
            else:
                item[col] = str(value)
        
        items.append(item)
    
    return items
```

**src/handler.py:**
```python
import json
import time
from typing import Dict, Any
from src.extract import extract_from_s3
from src.transform import transform_data
from src.load import load_to_dynamodb
from src.utils.logger import setup_logger

logger = setup_logger(__name__)

def lambda_handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    AWS Lambda handler for ETL pipeline.
    
    Args:
        event: Lambda event containing S3 bucket and key
        context: Lambda context
    
    Returns:
        Response dictionary with status and statistics
    """
    start_time = time.time()
    
    try:
        # Extract S3 information from event
        record = event['Records'][0]
        bucket_name = record['s3']['bucket']['name']
        file_key = record['s3']['object']['key']
        
        logger.info(f"Processing file: s3://{bucket_name}/{file_key}")
        
        # Extract
        df = extract_from_s3(bucket_name, file_key)
        
        # Transform
        df_transformed = transform_data(df)
        
        # Load
        table_name = 'EmployeeData'  # Could come from environment variable
        load_stats = load_to_dynamodb(df_transformed, table_name)
        
        execution_time = time.time() - start_time
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'ETL pipeline completed successfully',
                'records_processed': len(df),
                'records_loaded': load_stats['records_loaded'],
                'errors': load_stats['errors'],
                'execution_time_seconds': round(execution_time, 2)
            })
        }
        
    except Exception as e:
        logger.error(f"ETL pipeline failed: {str(e)}")
        execution_time = time.time() - start_time
        
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': 'ETL pipeline failed',
                'error': str(e),
                'execution_time_seconds': round(execution_time, 2)
            })
        }
```

### Step 5: Testing

**tests/test_extract.py:**
```python
import pytest
import pandas as pd
from moto import mock_s3
import boto3
from src.extract import extract_from_s3

@mock_s3
def test_extract_from_s3():
    # Create mock S3 bucket and file
    s3 = boto3.client('s3', region_name='us-east-1')
    s3.create_bucket(Bucket='test-bucket')
    
    # Upload test CSV
    csv_content = "id,name,email\n1,John,john@test.com\n2,Jane,jane@test.com"
    s3.put_object(Bucket='test-bucket', Key='test.csv', Body=csv_content)
    
    # Test extraction
    df = extract_from_s3('test-bucket', 'test.csv')
    
    assert len(df) == 2
    assert 'id' in df.columns
    assert 'name' in df.columns
```

**tests/test_transform.py:**
```python
import pytest
import pandas as pd
from src.transform import transform_data

def test_transform_data():
    # Create test DataFrame
    df = pd.DataFrame({
        'employee_id': ['E001', 'E002', 'E001'],  # Duplicate
        'first_name': ['john', 'JANE', 'bob'],
        'email': ['John@Test.com', 'jane@test.com', 'invalid-email'],
        'salary': ['75000', '65000', None]
    })
    
    # Transform
    result = transform_data(df)
    
    # Assertions
    assert len(result) == 2  # Duplicate removed
    assert result['first_name'].iloc[0] == 'John'  # Title case
    assert result['email'].iloc[0] == 'john@test.com'  # Lowercase
```

### Step 6: Deployment Configuration

**.gitignore:**
```
venv/
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
env/
.venv
*.zip
.DS_Store
.idea/
.vscode/
*.log
```

**README.md template:**
```markdown
# Python ETL Pipeline

ETL pipeline for processing CSV files from S3 and loading to DynamoDB.

## Features

- Extract CSV data from S3
- Transform and clean data
- Load to DynamoDB
- Error handling and logging
- Unit and integration tests

## Setup

1. Install dependencies: `pip install -r requirements.txt`
2. Configure AWS credentials
3. Create DynamoDB table
4. Deploy Lambda function

## Usage

[Add usage instructions]
```

## Success Criteria

**Project is complete when:**
- [ ] All modules implemented and tested
- [ ] Unit tests pass with >80% coverage
- [ ] Lambda function deployed to AWS
- [ ] Pipeline processes CSV files successfully
- [ ] Error handling works correctly
- [ ] Documentation is complete
- [ ] Code is clean and well-commented
- [ ] README includes setup and usage instructions

## Timeline

**Estimated Time:** 2-3 days (full-time) or 1-2 weeks (part-time)

- Day 1: Setup, Extract, Transform modules
- Day 2: Load module, Handler, Testing
- Day 3: AWS deployment, Documentation, Polish

## Next Steps After Completion

1. Add to portfolio/GitHub
2. Write blog post about the project
3. Add to resume under Projects
4. Prepare to discuss in interviews
5. Consider enhancements (monitoring, retries, etc.)

## Enhancement Ideas (Optional)

- Add data quality metrics/reporting
- Implement retry logic with exponential backoff
- Add CloudWatch metrics and alarms
- Support multiple file formats (JSON, Parquet)
- Add data validation rules configuration
- Implement incremental loading
- Add data lineage tracking
