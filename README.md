Query the server
curl -X POST -H "Content-Type: application/json" -d '{"query": "{ hello, name, rollDice(numDice: 3, numSides: 6) }"}' http://localhost:4001/graphql | jq
