import { Client, isFullPage } from "@notionhq/client";

// Initialize the Notion client
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export interface NotionJournalArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  cover: string;
  published: boolean;
  date: string;
}

export async function getJournalArticles(): Promise<NotionJournalArticle[]> {
  // Type assertion untuk menjamin strict string pada argumen query Notion
  const dataSourceId = process.env.NOTION_DATA_SOURCE_ID as string;

  if (!dataSourceId) {
    console.error("NOTION_DATA_SOURCE_ID not found");
    return [];
  }

  try {
    console.log("NATION ID", dataSourceId); 

    const response = await (notion as any).dataSources.query({
      data_source_id: dataSourceId,
      sorts: [
        {
          property: "date",
          direction: "descending",
        },
      ],
    });

    const articles: NotionJournalArticle[] = [];

    for (const page of response.results) {
      // Type guard resmi Notion SDK untuk memastikan page adalah FullPageResponse
      if (!isFullPage(page)) {
        continue;
      }

      let coverUrl = "";

      // Cek apakah ada properti custom "cover" bertipe files (seperti di kode lama)
      const coverProp = page.properties.cover;
      if (coverProp?.type === "files" && coverProp.files.length > 0) {
        const file = coverProp.files[0];
        if (file.type === "external") {
          coverUrl = file.external.url;
        } else if (file.type === "file") {
          coverUrl = file.file.url;
        }
      } else if (page.cover) {
        // Fallback untuk membaca gambar cover native dari Notion page
        if (page.cover.type === "external") {
          coverUrl = page.cover.external.url;
        } else if (page.cover.type === "file") {
          coverUrl = page.cover.file.url;
        }
      }

      // Membaca properties menggunakan Type Narrowing untuk menghindari any
      const namaProp = page.properties.Nama;
      const title =
        namaProp?.type === "title"
          ? namaProp.title.map((t) => t.plain_text).join("")
          : "";

      const slugProp = page.properties.slug;
      const slug =
        slugProp?.type === "rich_text"
          ? slugProp.rich_text.map((t) => t.plain_text).join("")
          : "";

      const excerptProp = page.properties.Excerpt;
      const excerpt =
        excerptProp?.type === "rich_text"
          ? excerptProp.rich_text.map((t) => t.plain_text).join("")
          : "";

      const categoryProp = page.properties.Category;
      const category =
        categoryProp?.type === "select"
          ? categoryProp.select?.name || ""
          : "";

      const publishedProp = page.properties.published;
      const published =
        publishedProp?.type === "checkbox" ? publishedProp.checkbox : false;

      const dateProp = page.properties.date;
      const date = dateProp?.type === "date" ? dateProp.date?.start || "" : "";

      console.log("PUBLISHED PROPERTY");
      console.log(page.properties.published);

      console.log("ALL PROPERTY NAMES");
      console.log(Object.keys(page.properties));

      articles.push({
        id: page.id,
        title,
        slug,
        excerpt,
        category,
        cover: coverUrl,
        published,
        date,
      });
    }

    return articles;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getArticleBySlug(
  slug: string
): Promise<NotionJournalArticle | null> {
  const dataSourceId = process.env.NOTION_DATA_SOURCE_ID as string;

  if (!dataSourceId) {
    console.error("NOTION_DATA_SOURCE_ID not found");
    return null;
  }

  try {
    const response = await (notion as any).dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: "slug",
        rich_text: {
          equals: slug,
        },
      },
    });

    if (response.results.length === 0) {
      return null;
    }

    const page = response.results[0];

    if (!isFullPage(page)) {
      return null;
    }

    let coverUrl = "";

    const coverProp = page.properties.cover;
    if (coverProp?.type === "files" && coverProp.files.length > 0) {
      const file = coverProp.files[0];
      if (file.type === "external") {
        coverUrl = file.external.url;
      } else if (file.type === "file") {
        coverUrl = file.file.url;
      }
    } else if (page.cover) {
      if (page.cover.type === "external") {
        coverUrl = page.cover.external.url;
      } else if (page.cover.type === "file") {
        coverUrl = page.cover.file.url;
      }
    }

    const namaProp = page.properties.Nama;
    const title = namaProp?.type === "title" ? namaProp.title.map((t) => t.plain_text).join("") : "";

    const slugProp = page.properties.slug;
    const mappedSlug = slugProp?.type === "rich_text" ? slugProp.rich_text.map((t) => t.plain_text).join("") : "";

    const excerptProp = page.properties.Excerpt;
    const excerpt = excerptProp?.type === "rich_text" ? excerptProp.rich_text.map((t) => t.plain_text).join("") : "";

    const categoryProp = page.properties.Category;
    const category = categoryProp?.type === "select" ? categoryProp.select?.name || "" : "";

    const publishedProp = page.properties.published;
    const published = publishedProp?.type === "checkbox" ? publishedProp.checkbox : false;

    const dateProp = page.properties.date;
    const date = dateProp?.type === "date" ? dateProp.date?.start || "" : "";

    return {
      id: page.id,
      title,
      slug: mappedSlug,
      excerpt,
      category,
      cover: coverUrl,
      published,
      date,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getArchiveArticles(): Promise<NotionJournalArticle[]> {
  // Type assertion untuk menjamin strict string pada argumen query Notion
  const dataSourceId = process.env.NOTION_ARCHIVE_DATABASE_ID as string;

  if (!dataSourceId) {
    console.error("NOTION_ARCHIVE_DATABASE_ID not found");
    return [];
  }

  try {
    console.log("ARCHIVE DATABASE ID", dataSourceId); 

    const response = await (notion as any).dataSources.query({
      data_source_id: dataSourceId,
      sorts: [
        {
          property: "date",
          direction: "descending",
        },
      ],
    });

    const articles: NotionJournalArticle[] = [];

    for (const page of response.results) {
      // Type guard resmi Notion SDK untuk memastikan page adalah FullPageResponse
      if (!isFullPage(page)) {
        continue;
      }

      let coverUrl = "";

      // Cek apakah ada properti custom "cover" bertipe files (seperti di kode lama)
      const coverProp = page.properties.cover;
      if (coverProp?.type === "files" && coverProp.files.length > 0) {
        const file = coverProp.files[0];
        if (file.type === "external") {
          coverUrl = file.external.url;
        } else if (file.type === "file") {
          coverUrl = file.file.url;
        }
      } else if (page.cover) {
        // Fallback untuk membaca gambar cover native dari Notion page
        if (page.cover.type === "external") {
          coverUrl = page.cover.external.url;
        } else if (page.cover.type === "file") {
          coverUrl = page.cover.file.url;
        }
      }

      // Membaca properties menggunakan Type Narrowing untuk menghindari any
      const namaProp = page.properties.Nama;
      const title =
        namaProp?.type === "title"
          ? namaProp.title.map((t) => t.plain_text).join("")
          : "";

      const slugProp = page.properties.slug;
      const slug =
        slugProp?.type === "rich_text"
          ? slugProp.rich_text.map((t) => t.plain_text).join("")
          : "";

      const excerptProp = page.properties.Excerpt;
      const excerpt =
        excerptProp?.type === "rich_text"
          ? excerptProp.rich_text.map((t) => t.plain_text).join("")
          : "";

      const categoryProp = page.properties.Category;
      const category =
        categoryProp?.type === "select"
          ? categoryProp.select?.name || ""
          : "";

      const publishedProp = page.properties.published;
      const published =
        publishedProp?.type === "checkbox" ? publishedProp.checkbox : false;

      const dateProp = page.properties.date;
      const date = dateProp?.type === "date" ? dateProp.date?.start || "" : "";

      articles.push({
        id: page.id,
        title,
        slug,
        excerpt,
        category,
        cover: coverUrl,
        published,
        date,
      });
    }

    return articles;
  } catch (error) {
    console.error(error);
    return [];
  }
}
