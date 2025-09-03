import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";

export async function adminGetCourses (){
    await requireAdmin()

    const data = await prisma.course.findMany({
        select: {
            id: true,
            title: true,
            smallDescription: true,
            duration: true,
            

        }
    })

}