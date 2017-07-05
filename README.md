# Description
# How to
## How to setup up
## How to profiling
1. `npm run profiling`
2. `wrk -t12 -c400 -d10s http://localhost:9999/`
3. `node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed.txt`
## How to manually generate password
1. `npm run genpw -- genpw --pw mypasswordhere`
2. Save it to database or whatever
## How to contribute
