# What is s3abird?

It's a webmail client for viewing emails stored on AWS S3 buckets.

The purpose of this project is to give an easy interface to browse
through emails received via AWS SES and stored on S3 buckets, although
it will work on any buckets containing raw emails.

# Setup

There are several steps required to make _s3abird_ work.
* creating an S3 bucket
* creating credentials that have read access to this bucket
* setting proper CORS policy

IAM policy granting read access:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowBucketRead",
            "Effect": "Allow",
            "Action": [
                "s3:getObject",
                "s3:listBucket"
            ],
            "Resource": "arn:aws:s3:::<your_bucket_name>"
        }
    ]
}
```

A sufficient CORS policy can look like this:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedHeader>*</AllowedHeader>
</CORSRule>
</CORSConfiguration>
```

Besides configuring an S3 bucket for reads you will probably want to
[configure
SES](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-getting-started.html)
so that it can store incoming messages in this bucket.

# Roadmap

The following features are likely to be integrated soon into s3abird.

* integrate SES so that it's possible to reply to emails or write new
  ones
* modularise email storage and sending so that it's possible to use
  other providers

# Contributing

Feel free to submit pull requests - doesn't have to be limited to just the features on
the roadmap.

If there are particular features you would like to see you can also
[submit a ticket](https://github.com/mewa/s3abird/issues/new).
