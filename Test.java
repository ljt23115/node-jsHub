import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.util.*;

public class Test {
    public static void main(String[] args) {
        List<User> userList = new ArrayList<>();
        for (int j = 0; j < 10; j++) {
            for (int i = 0; i < 10000; i++) {
                userList.add(new User(String.valueOf(i)));
            }
        }
        long t = System.currentTimeMillis();
        var r = distinct(userList);
        System.out.println(System.currentTimeMillis() - t);
//        System.out.println(userList);
//        System.out.println(r);


    }

    public static List<User> distinct(List<User> userList) {
        List<User>[] users = new List[1000];
        List<User> result = new ArrayList<>();
        outer:
        for (User user : userList) {
            var code = user.hashCode() % 1000;

            if (null == users[code])
                users[code] = new ArrayList<>();
            else
                for (User u : users[code])
                    if (u.equals(user)) {
                        continue outer;
                    }

            result.add(user);
            users[code].add(user);
        }

        return result;
    }
}


class User {
    public String field;

    public User(String field) {
        this.field = field;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        var user = (User) o;
        return Objects.equals(field, user.field);
    }

    @Override
    public int hashCode() {
        return Objects.hash(field);
    }

    @Override
    public String toString() {
        return "User{" +
                "field='" + field + '\'' +
                '}';
    }
}