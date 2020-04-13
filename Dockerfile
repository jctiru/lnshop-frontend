FROM node:alpine as builder
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM garland/aws-cli-docker
COPY --from=builder /app/build ./ 
# Exec Form
CMD ["sh", "-c", "aws s3 sync --delete ./ s3://$S3_BUCKET"]
# Shell Form
# CMD aws s3 sync --delete ./ s3://$S3_BUCKET

# Docker Build
# docker build -t jctiru/lnshop-frontend .
# Docket Run
# docker run -e AWS_ACCESS_KEY_ID=val -e AWS_SECRET_ACCESS_KEY=val -e AWS_DEFAULT_REGION=val -e S3_BUCKET=val jctiru/lnshop-frontend
