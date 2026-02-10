import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        let settings = await prisma.globalSettings.findFirst();

        if (!settings) {
            settings = await prisma.globalSettings.create({
                data: {},
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error("[SETTINGS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();
        const {
            googleAnalyticsId,
            googleSiteVerification,
            bingSiteVerification,
            yandexSiteVerification,
            sitemapUrl,
        } = body;

        let settings = await prisma.globalSettings.findFirst();

        if (settings) {
            settings = await prisma.globalSettings.update({
                where: { id: settings.id },
                data: {
                    googleAnalyticsId,
                    googleSiteVerification,
                    bingSiteVerification,
                    yandexSiteVerification,
                    sitemapUrl,
                },
            });
        } else {
            settings = await prisma.globalSettings.create({
                data: {
                    googleAnalyticsId,
                    googleSiteVerification,
                    bingSiteVerification,
                    yandexSiteVerification,
                    sitemapUrl,
                },
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error("[SETTINGS_UPDATE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
