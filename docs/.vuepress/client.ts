import { defineClientConfig } from "@vuepress/client";
import { addIcons } from "oh-vue-icons";
import {
  CoGit,
  FaFortAwesome,
  FaSatelliteDish,
  FaTag,
  OiGitCompare,
  OiRocket,
  RiArticleLine,
  RiBilibiliLine,
  RiBook2Fill,
  RiGithubLine,
  RiHeartPulseFill,
  RiSailboatLine,
  RiVuejsLine,
} from "oh-vue-icons/icons";

addIcons(
  RiBilibiliLine,
  FaFortAwesome,
  FaTag,
  RiHeartPulseFill,
  FaSatelliteDish,
  RiBook2Fill,
  RiArticleLine,
  RiVuejsLine,
  CoGit,
  RiGithubLine,
  OiGitCompare,
  OiRocket,
  RiSailboatLine,
);

export default defineClientConfig({});
