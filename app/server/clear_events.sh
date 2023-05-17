#!/bin/bash

docker exec -it postgres-container psql -U guard -d electronic_guard_journal \ DROP TABLE EVENTS;
