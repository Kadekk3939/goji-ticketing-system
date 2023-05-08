package pl.polsl.tab.goji.utility;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import pl.polsl.tab.goji.model.entity.User;

import java.util.Objects;


@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CurrentUserData {
    private static Object getPrincipal() {
        return SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public static boolean isAnyoneLogged() {
        Object principal = getPrincipal();
        return principal instanceof User;
    }


    public static User getCurrentUser() {
        Object principal = getPrincipal();

        if (principal instanceof User) {
            return (User) principal;
        }
        return null;
    }

    public static Long getCurrentUserId() {
        Object principal = getPrincipal();

        if (principal instanceof User) {
            return ((User)principal).getUserId();
        }
        return null;
    }

    public static String getCurrentUserLogin() {
        Object principal = getPrincipal();

        if (principal instanceof User) {
            return ((User)principal).getUsername();
        }
        return null;
    }

    public static String getCurrentUserRole() {
        Object principal = getPrincipal();

        if (principal instanceof User) {
            return ((User)principal).getAuthorities().stream().filter(Objects::nonNull).findFirst().toString();
        }
        return null;
    }
}