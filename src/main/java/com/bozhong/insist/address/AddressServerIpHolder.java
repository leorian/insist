package com.bozhong.insist.address;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.Enumeration;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AddressServerIpHolder
{
  private static Logger LOG = LoggerFactory.getLogger(AddressServerIpHolder.class);
  private static final String ADDRESS_SERVER_IP_PROPERTY_NAME = "address.server.ip";
  private static Pattern IPv4RegexPattern = Pattern.compile("^(([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.){3}([01]?\\d\\d?|2[0-4]\\d|25[0-5])$");

  private static final String ADDRESS_SERVER_IP = getAddressServerIpInterval();

  public static String getAddressServerIp() {
    return ADDRESS_SERVER_IP;
  }

  private static String getAddressServerIpInterval() {
    try {
      String addressServerIp = System.getProperty("address.server.ip");
      if ((addressServerIp != null) && (validate(addressServerIp))) {
        return addressServerIp;
      }
      return getPublicIPv4();
    }
    catch (Exception e) {
      LOG.error("find address server ip failed.");
      throw new RuntimeException(e);
    }
  }

  private static String getPublicIPv4() throws UnknownHostException, SocketException {
    Enumeration networkInterfaces = NetworkInterface.getNetworkInterfaces();
    while (networkInterfaces.hasMoreElements()) {
      NetworkInterface networkInterface = (NetworkInterface)networkInterfaces.nextElement();
      if (validate(networkInterface))
      {
        Enumeration inetAddresses = networkInterface.getInetAddresses();
        while (inetAddresses.hasMoreElements()) {
          InetAddress inetAddress = (InetAddress)inetAddresses.nextElement();
          String currentAddress = inetAddress.getHostAddress();
          LOG.debug("IP address " + currentAddress + " found");
          if (validate(currentAddress))
            return currentAddress;
        }
      }
    }
    return null;
  }

  private static boolean validate(NetworkInterface networkInterface) throws SocketException
  {
    return (!networkInterface.isLoopback()) && (!networkInterface.isVirtual()) && (networkInterface.isUp());
  }

  private static boolean validate(String ip) {
    return IPv4RegexPattern.matcher(ip).matches();
  }
}