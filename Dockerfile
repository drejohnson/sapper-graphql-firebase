FROM mhart/alpine-node:11.14

# install dependencies
WORKDIR /app
COPY package.json yarn.lock ./
# RUN npm ci --production

# Install Node.js dependencies
RUN yarn install --production --no-progress

###
# Only copy over the Node pieces we need
# ~> Saves 35MB
###
FROM mhart/alpine-node:base-11.14

WORKDIR /app
COPY --from=0 /app .
COPY . .

EXPOSE 3000
CMD ["node", "__sapper__/build"]