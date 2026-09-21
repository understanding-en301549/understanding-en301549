export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addGlobalData("hideRequirement", true);

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
}
