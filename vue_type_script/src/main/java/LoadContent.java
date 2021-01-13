/*
 * Copyright (c) 2021. Prototype
 */

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLSocketFactory;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;

public class LoadContent {

    private static final String URL_FILE = "https://plugins.jetbrains.com/files/brokenPlugins.json";

    public static void main(String[] args) {
        System.out.println("LoadContent:");
        final SSLSocketFactory sslsocketfactory = (SSLSocketFactory) SSLSocketFactory.getDefault();
        try {
            final URL url = new URL(URL_FILE);
            final HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
            conn.setSSLSocketFactory(sslsocketfactory);
            final InputStream inputstream = conn.getInputStream();
            final byte[] buff = new byte[1024];
            int count;
            while ((count = inputstream.read(buff)) > 0) {
                System.out.printf("%s", new String(buff, 0, count));
            }
            System.out.println();
            inputstream.close();
        } catch (MalformedURLException ex) {
            System.err.println("MalformedURLException : " + ex.getMessage());
            ex.printStackTrace();
        } catch (IOException ex) {
            System.err.println("IOException : " + ex.getMessage());
            ex.printStackTrace();
        }

    }
}
