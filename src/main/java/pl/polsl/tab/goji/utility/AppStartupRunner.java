package pl.polsl.tab.goji.utility;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import pl.polsl.tab.goji.service.UserRoleService;

@Component
public class AppStartupRunner implements ApplicationRunner {

    private static final Logger LOG = Logger.getLogger(AppStartupRunner.class.getName());

    private final UserRoleService userRoleService;

    public AppStartupRunner(UserRoleService userRoleService) {
        this.userRoleService = userRoleService;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        LOG.info("Increment counter");
        Long id = userRoleService.getUserRoleIdByRoleName("aaa");
        LOG.info(id == null ? "Ni mo" : id.toString());
    }
}