#!/bin/bash

sleep 98604000

psql -U guard -d electronic_guard_journal < /drop_events_table.sql;
