import { greeting } from "@moonlight-mod/wp/meow_someLibrary";

const logger = moonlight.getLogger("meow/entrypoint");
logger.info("Hello from entrypoint!");
logger.info("someLibrary exports:", greeting);

const natives = moonlight.getNatives("meow");
logger.info("node exports:", natives);
