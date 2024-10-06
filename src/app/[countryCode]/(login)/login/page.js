"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { getCheckSession, login, register } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/app/consts/initialStates";
import useUserStore from "@/app/store/userStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export default function AuthScreen({ params }) {
  const [userInfos, setUserInfos] = useState(auth);
  const { setUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const response = await getCheckSession();
      setUser(response);
      if (response.status) {
        router.push(`/${params.countryCode}/main`);
      }
    };

    checkSession();
  }, []);

  const reg = async () => {
    if (
      userInfos.email !== "" &&
      userInfos.password !== "" &&
      userInfos.name !== ""
    ) {
      const response = await register(userInfos);
      if (!response.status) {
        alert(response.message);
      } else {
        setUserInfos(auth);
        alert(response.message);
      }
    } else alert("Lütfen boş alan bırakmayınız");
  };

  const handleLogin = async () => {
    if (userInfos.email !== "" && userInfos.password !== "") {
      const response = await login(userInfos);
    } else {
      alert("Giriş yaparken bir hata oluştu!");
    }
  };

  return (
    <div className="min-h-screen dark:bg-card flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Hesap</CardTitle>
          <CardDescription>
            Giriş yapın veya yeni bir hesap oluşturun.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Giriş Yap</TabsTrigger>
              <TabsTrigger value="register">Kayıt Ol</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={userInfos.email}
                    onChange={(e) =>
                      setUserInfos({
                        ...userInfos,
                        email: e.target.value.trim(),
                      })
                    }
                    type="email"
                    placeholder="m@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Şifre</Label>
                  <Input
                    id="password"
                    value={userInfos.password}
                    onChange={(e) =>
                      setUserInfos({
                        ...userInfos,
                        password: e.target.value.trim(),
                      })
                    }
                    type="password"
                  />
                </div>
                <Button className="w-full" onClick={handleLogin}>
                  Giriş Yap
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="register">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">İsim</Label>
                  <Input
                    onChange={(e) =>
                      setUserInfos({
                        ...userInfos,
                        name: e.target.value.trim(),
                      })
                    }
                    id="register-name"
                    type="text"
                    value={userInfos.name}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    onChange={(e) =>
                      setUserInfos({
                        ...userInfos,
                        email: e.target.value.trim(),
                      })
                    }
                    type="email"
                    value={userInfos.email}
                    placeholder="m@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Şifre</Label>
                  <Input
                    id="register-password"
                    value={userInfos.password}
                    onChange={(e) =>
                      setUserInfos({
                        ...userInfos,
                        password: e.target.value.trim(),
                      })
                    }
                    type="password"
                  />
                </div>
                <Button className="w-full" onClick={reg}>
                  Kayıt Ol
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
