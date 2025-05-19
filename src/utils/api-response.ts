const generateResponse = <T>({
  statusCode,
  success = true,
  message,
  data = null,
}: {
  statusCode: number;
  success?: boolean;
  message: string;
  data?: T | null;
}) => {
  const response = {
    success,
    code: statusCode,
    message,
    ...(data && { data }),
  };
  return response;
};

export default generateResponse;
