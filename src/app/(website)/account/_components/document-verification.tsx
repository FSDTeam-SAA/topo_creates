"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { DBUser } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { AlertCircleIcon, Loader2 } from "lucide-react";
import { Session } from "next-auth";
import { useEffect } from "react";

interface GetApiRes {
  status: boolean;
  message: {
    url: string;
    message: string;
  };
}

export interface UserResponse {
  status: boolean;
  message: string;
  data: DBUser;
}

interface Props {
  session: Session;
}

const DocumentVerification = ({ session }: Props) => {
  const {
    data: kycRes,
    refetch: fetchKyc,
    isFetching,
  } = useQuery<GetApiRes>({
    queryKey: ["kyc-check"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/kyc/verify`, {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      }).then((res) => res.json()),
    enabled: false,
  });

  const {
    data: userRes,
    isLoading,
    isError,
    error,
  } = useQuery<UserResponse>({
    queryKey: ["user", session.user.id],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/${session.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        }
      ).then((res) => res.json()),
  });

  useEffect(() => {
    if (kycRes && kycRes.status) {
      window.location.href = kycRes.message.url;
    }
  }, [kycRes]);

  let content;

  if (isLoading) {
    content = <></>;
  } else if (isError) {
    content = <p>{error.message}</p>;
  } else if (userRes && !userRes.data.kycVerified) {
    content = (
      <Alert
        variant="destructive"
        className="flex items-center justify-between"
      >
        <div className="flex items-start gap-x-2">
          <AlertCircleIcon />
          <div>
            <AlertTitle>Document verification required</AlertTitle>
            <AlertDescription>
              Please upload your documents to continue using all features.
            </AlertDescription>
          </div>
        </div>

        <Button
          variant="secondary"
          onClick={() => fetchKyc()}
          disabled={isFetching}
        >
          Verify {isFetching ? <Loader2 className="animate-spin" /> : "Now"}
        </Button>
      </Alert>
    );
  }

  return content;
};

export default DocumentVerification;
