import aws from "aws-sdk";

process.env.AWS_PROFILE = "frontend";

const client = new aws.SSM({ region: "eu-west-1" });

export const getParam = async (path: string): Promise<string> => {
    const value = await client.getParameter({ Name: path }).promise();
    return value.Parameter.Value;
};
