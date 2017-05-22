CREATE SCHEMA configcenter AUTHORIZATION configcenter;

CREATE TABLE config_info 
  (id BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1),
  data_id VARCHAR(255)  NOT NULL,
  group_id VARCHAR(128)  NOT NULL,
  content LONG VARCHAR  NOT NULL,
  md5 VARCHAR(32) DEFAULT NULL,
  src_ip VARCHAR(20) DEFAULT NULL,
  gmt_create TIMESTAMP NOT NULL DEFAULT '1970-01-01 00:00:00',
  gmt_modified TIMESTAMP NOT NULL DEFAULT '1970-01-01 00:00:00',
  app_name VARCHAR(128) DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT uk_configinfo_dataid UNIQUE (data_id,group_id));
      
CREATE INDEX dataid_key_idx ON config_info(data_id);
CREATE INDEX groupid_key_idx ON config_info(group_id);
CREATE INDEX dataid_group_key_idx ON config_info(data_id, group_id);      