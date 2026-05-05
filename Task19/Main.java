import java.util.Scanner;

public class Main {

    public static String greet(String name) {
        return "Hello, " + name + "! Welcome to Git Java Project.";
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter your name: ");
        String name = sc.nextLine();

        System.out.println(greet(name));

        sc.close();
    }
}