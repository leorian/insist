package com.bozhong.insist;

import com.bozhong.insist.address.AddressServerIpHolder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;

@SpringBootApplication
@EnableAutoConfiguration
public class ConfigCenterMain {
    private static Logger LOG = LoggerFactory.getLogger(ConfigCenterMain.class);

    public static void main(String[] args) throws Exception {
        ConfigurableApplicationContext applicationContext = SpringApplication.run(new Class[]{ConfigCenterMain.class}, args);
        String ip = AddressServerIpHolder.getAddressServerIp();
        String port = applicationContext.getEnvironment().getProperty("server.port");
        LOG.info("Config-Center has been started successfully.");
        LOG.info("Now, you can open the follow url to view config and service.");
        LOG.info("=========================[http://" + ip + ":" + port + "]=========================");
    }
}