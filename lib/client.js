import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";
export const client = sanityClient({
  projectId: "en1mwqam",
  dataset: "production",
  apiVersion: "2023-10-26",
  useCdn: true,
  token:
    "skFYQ3f7ELKdjFmkkS0DYlaYvwOptM7YsHFApPSGEGMhyhMJB2kbkCvkqi6Chjves3D5sjr39x1gik6xnzEttqvIELkRxvaYC1w7Y7lkVQd6UUK7307GEZD33lyVWCSyeb8qq7y8sm6BCZnmOoo36qtcwkkY9aIuFKHLQTNLoX8tWa6s5Z1n",
});
const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
