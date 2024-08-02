#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $5)
    local CP=$(one_line_pem $6)
    sed -e "s/\${ORG}/$1/g" \
        -e "s/\${P0PORT}/$2/g" \
        -e "s/\${P1PORT}/$3/g" \
        -e "s/\${CAPORT}/$4/g" \
        -e "s#\${PEERPEM}#$PP#g" \
        -e "s#\${CAPEM}#$CP#g" \
        organizations/ccp-template.json
}

function yaml_ccp {
    local PP=$(one_line_pem $5)
    local CP=$(one_line_pem $6)
    sed -e "s/\${ORG}/$1/g" \
        -e "s/\${P0PORT}/$2/g" \
        -e "s/\${P1PORT}/$3/g" \
        -e "s/\${CAPORT}/$4/g" \
        -e "s#\${PEERPEM}#$PP#g" \
        -e "s#\${CAPEM}#$CP#g" \
        organizations/ccp-template.yaml | sed -e $'s/\\\\n/\\\n          /g'
}

function explorer_ca_json_ccp {
    local PP=$(one_line_pem $5)
    local CP=$(one_line_pem $6)
    sed -e "s/\${ORG}/$1/g" \
        -e "s/\${P0PORT}/$2/g" \
        -e "s/\${P1PORT}/$3/g" \
        -e "s/\${CAPORT}/$4/g" \
        -e "s#\${PEERPEM}#$PP#g" \
        -e "s#\${CAPEM}#$CP#g" \
        organizations/ccp-explorer-ca-template.json
}

function explorer_json_ccp {
    local PP=$(one_line_pem $5)
    local CP=$(one_line_pem $6)
    sed -e "s/\${ORG}/$1/g" \
        -e "s/\${P0PORT}/$2/g" \
        -e "s/\${P1PORT}/$3/g" \
        -e "s/\${CAPORT}/$4/g" \
        -e "s#\${PEERPEM}#$PP#g" \
        -e "s#\${CAPEM}#$CP#g" \
        -e "s#\${PEERPRIV}#$PEERPRIV#g" \
        organizations/ccp-explorer-template.json
}


ORG=1
P0PORT=7051
P1PORT=7151
CAPORT=7054
PEERPEM=organizations/peerOrganizations/org1.example.com/tlsca/tlsca.org1.example.com-cert.pem
CAPEM=organizations/peerOrganizations/org1.example.com/ca/ca.org1.example.com-cert.pem
PEERPRIV=$(ls organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/keystore/*_sk | head -n 1 | sed 's/^organizations\///')

echo "$(json_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/org1.example.com/connection-org1.json
echo "$(yaml_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/org1.example.com/connection-org1.yaml
echo "$(explorer_ca_json_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > explorer/connection-profile/connection-ca-org1.json
echo "$(explorer_json_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > explorer/connection-profile/connection-org1.json

ORG=2
P0PORT=9051
P1PORT=9151
CAPORT=8054
PEERPEM=organizations/peerOrganizations/org2.example.com/tlsca/tlsca.org2.example.com-cert.pem
CAPEM=organizations/peerOrganizations/org2.example.com/ca/ca.org2.example.com-cert.pem
PEERPRIV=$(ls organizations/peerOrganizations/org2.example.com/users/User1@org2.example.com/msp/keystore/*_sk | head -n 1 | sed 's/^organizations\///')

echo "$(json_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/org2.example.com/connection-org2.json
echo "$(yaml_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/org2.example.com/connection-org2.yaml
echo "$(explorer_ca_json_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > explorer/connection-profile/connection-ca-org2.json
echo "$(explorer_json_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > explorer/connection-profile/connection-org2.json

ORG=3
P0PORT=11051
P1PORT=11151
CAPORT=11054
PEERPEM=organizations/peerOrganizations/org3.example.com/tlsca/tlsca.org3.example.com-cert.pem
CAPEM=organizations/peerOrganizations/org3.example.com/ca/ca.org3.example.com-cert.pem
PEERPRIV=$(ls organizations/peerOrganizations/org3.example.com/users/User1@org3.example.com/msp/keystore/*_sk | head -n 1 | sed 's/^organizations\///')

echo "$(json_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/org3.example.com/connection-org3.json
echo "$(yaml_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/org3.example.com/connection-org3.yaml
echo "$(explorer_ca_json_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > explorer/connection-profile/connection-ca-org3.json
echo "$(explorer_json_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > explorer/connection-profile/connection-org3.json