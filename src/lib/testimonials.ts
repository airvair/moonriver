import { Testimonial } from "./types/testimonials";
import { getTestimonials as fetchSanityTestimonials, urlFor, type SanityTestimonial } from "./sanity";

// Fetch testimonials from Sanity CMS
export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const sanityTestimonials = await fetchSanityTestimonials();
    if (sanityTestimonials && sanityTestimonials.length > 0) {
      return sanityTestimonials.map((t: SanityTestimonial) => ({
        id: t._id,
        name: t.name,
        role: t.role || "",
        rating: (t.rating as 1 | 2 | 3 | 4 | 5) || 5,
        review: t.review,
        initials: t.initials || t.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2),
        avatar: t.avatar ? urlFor(t.avatar).width(96).height(96).url() : undefined,
      }));
    }
  } catch (error) {
    console.error("Failed to fetch testimonials from Sanity:", error);
  }
  // Fallback to default testimonials
  return TESTIMONIALS;
}

// Default testimonials data (fallback if Sanity fetch fails)
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Varsha Satish",
    role: "Remote Worker",
    rating: 5,
    review: "5/5 stars. A hidden gem with heart\n" +
        "\n" +
        "Moon River Café & Curiosities is truly one of a kind. I came in to get a little work done and ended up having one of the most peaceful, welcoming café experiences I’ve ever had. The space itself is stunning, filled with local art and cozy creative energy. It’s the kind of place that feeds both your body and your soul.\n" +
        "\n" +
        "I ordered the Bella Capri sandwich and a blackberry lavender Italian soda. Everything was incredibly fresh and full of flavor. You can tell the food is made with love.\n" +
        "\n" +
        "What made this visit truly unforgettable was my server Ilianna. She went above and beyond with her kindness, attention to detail, and amazing recommendations. I felt genuinely cared for, not just served. The rest of the staff and the owner Kate were also warm and passionate about what they do and it shows.\n" +
        "\n" +
        "Highly recommend this café if you’re looking for delicious food, a serene setting, and truly outstanding service. Can’t wait to come back soon!!",
    initials: "VS",
    // avatar: "/images/testimonials/john-doe.jpg", // Uncomment when image available
  },
  {
    id: 2,
    name: "Sky",
    role: "Local Guide",
    rating: 5,
    review: "The most beautiful place Brevard has to offer.\n" +
        "Moon River is a cozy, European-inspired café that perfectly blends great food, an extensive drink selection, and a warm, creative atmosphere.\n" +
        "More than a café, it’s a true third space—ideal for meeting friends, working, creating, or just unwinding. The real magic? It’s support for local artists.\n" +
        "The owners’ dedication to curating an enchanting space is evident in every detail.",
    initials: "S",
    // avatar: "/images/testimonials/jane-smith.jpg", // Uncomment when image available
  },
  {
    id: 3,
    name: "Karla Morales",
    role: "Breakfast Guest",
    rating: 5,
    review: "Wow, what an incredible experience! I had breakfast with my friends and from the moment we arrived, we felt so welcomed. They even opened the door a few minutes early when they saw us waiting outside, which set the tone right away. The seating area is beautiful, the art is amazing, and the atmosphere truly feels like being in Europe. The food was fresh and delicious, and the coffee had such a unique, wonderful flavor. Overall, it was a beautiful experience that made us feel right at home. I'll definitely be coming back and recommending this place to all my friends and family!",
    initials: "KM",
  },
  {
    id: 4,
    name: "Sophie Denninger",
    role: "Local Guide",
    rating: 5,
    review: "First of all.. I walked past this place a few months ago and knew I wanted to go, but never made time for it. I could see inside and it is so pretty and just has a wonderful atmosphere.. But I finally went today, and I am disappointed I didn't go sooner! I got the Belgian waffle with Nutella. Oh my god. It was so delicious, definitely the best waffle I've ever had!! I also got an iced coffee with a bunch of vanilla syrup, that was so yummy too. Besides this, the employees were so kind and I got my food fairly quick! It was pretty busy so I was impressed, especially since they were short-staffed. Also, they have a bunch of cool things to buy in there! Definitely will be coming regularly.",
    initials: "SD",
  },
  {
    id: 5,
    name: "Tony Ambush",
    role: "Local Guide",
    rating: 5,
    review: "Oh my, this place is amazing! Here for a day from Orlando. We were told by several local businesses to stop into this location. The atmosphere is great, people are fun, the decor is welcoming and comfortable. We really enjoyed our time here. Try the Pink Spiced Latte, delicious.",
    initials: "TA",
  },
  {
    id: 6,
    name: "Melbourne Business Advisors",
    role: "Local Business",
    rating: 5,
    review: "There is a reason Kate B.'s Moon River Cafe and Curiosities is ranked as Brevard County's #1 place for coffee. First, let's talk about the relaxed atmosphere crafted by Kate's own artwork and hand selected furniture and decor. It is an incredible and spacious place that makes luxury accessible to anyone. Next, the Lavaza coffee and decadent cookies made for a relaxing and tasty snack. Lastly, the service is excellent, where everyone is warmly greeted and engaged, which made me want to visit again the next time I am downtown. Moon River is an ideal place to relax downtown, after a show, dining, or shopping. Some people even find the environment a great place for a little off site work too. This would be a great place for private events too.",
    initials: "MB",
  },
  {
    id: 7,
    name: "Stacy C",
    role: "Brunch Guest",
    rating: 5,
    review: "I had the Belgian waffle and iced chai latte, which were delicious and served with a smile! But this is so much more than a cafe! The decor is captivating. It features a variety of comfortable seating options. It would be perfect for a date, an interview, or doing your school or remote work. There is soft music playing, and a section of it is an art gallery. Some pieces are for sale. There is a beautiful section in the back that is available to rent for private events. They even host special events like poetry nights. Moon River is a true gem in the heart of Downtown Melbourne.",
    initials: "SC",
  },
  {
    id: 8,
    name: "krystle",
    role: "Local Guide",
    rating: 5,
    review: "Pretty cute and cozy place. I like that it's a family owned business. Good food, friendly service, and quiet environment.",
    initials: "K",
  },
  {
    id: 9,
    name: "Kasey Giard",
    role: "Downtown Regular",
    rating: 5,
    review: "Every time I'm downtown, I have to stop in for an iced honey citron tea-- it's my favorite! I also totally recommend the sandwich with the goat cheese-- delish! The staff are so friendly, and the atmosphere is unique. I love the gallery with art by local artists. It's a great place to sit and visit with friends or stop for a late breakfast or lunch.",
    initials: "KG",
  },
];
