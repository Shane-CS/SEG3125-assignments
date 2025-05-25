FROM --platform=linux/amd64 nginx:alpine

# Copy the pre-built files
COPY dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY assignments/assignment1-portfolio/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

LABEL org.opencontainers.image.source=https://github.com/Shane-CS/SEG3125-assignments
LABEL org.opencontainers.image.description="Docker image for the SEG3125 assignment 1 portfolio - Shane Stock"
