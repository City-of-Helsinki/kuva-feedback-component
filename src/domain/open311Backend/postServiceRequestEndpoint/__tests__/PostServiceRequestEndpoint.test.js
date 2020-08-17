import PostServiceRequestEndpoint from "../PostServiceRequestEndpoint";

describe("PostServiceRequestEndpoint", () => {
  describe("prepareContent", () => {
    it("should throw an error when content is valid", async () => {
      const endpoint = new PostServiceRequestEndpoint("url");

      await expect(
        endpoint.prepareContent({})
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"description is a required field"`
      );
    });

    it("should prepare content correctly", async () => {
      const endpoint = new PostServiceRequestEndpoint("url");
      const values = {
        api_key: "1234",
        service_code: "1",
        service_request_type: "OTHER",
        description: "Some description",
      };
      const preparedContent = await endpoint.prepareContent(values);

      Object.keys(values).forEach((key) => {
        expect(preparedContent.get(key)).toEqual(values[key]);
      });
    });
  });
});
