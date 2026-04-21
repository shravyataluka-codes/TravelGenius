import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const destinations = [
  {
    name: "Hyderabad",
    subtitle: "Charminar & Heritage",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Charminar_Hyderabad_1.jpg/960px-Charminar_Hyderabad_1.jpg",
  },
  {
    name: "Goa",
    subtitle: "Coastal Paradise",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/BeachFun.jpg/960px-BeachFun.jpg",
  },
  {
    name: "Jaipur",
    subtitle: "Hawa Mahal",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/960px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg",
  },
  {
    name: "Kerala",
    subtitle: "Tranquil Backwaters",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Boathouse_%287063399547%29.jpg/960px-Boathouse_%287063399547%29.jpg",
  },
  {
    name: "Manali",
    subtitle: "Snowy Peaks",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Manali_City.jpg/960px-Manali_City.jpg",
  },
  {
    name: "Mysore",
    subtitle: "Mysore Palace",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mysore_Palace_Morning.jpg/960px-Mysore_Palace_Morning.jpg",
  },
  {
    name: "Ooty",
    subtitle: "Lush Tea Gardens",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Ooty_lake.jpg/960px-Ooty_lake.jpg",
  },
  {
    name: "Udaipur",
    subtitle: "City of Lakes",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Udaipur_Lake_Palace.jpg/960px-Udaipur_Lake_Palace.jpg",
  },
];

function Explore({ onExploreClick }) {
  return (
    <section id="explore" className="px-4 py-16 dark:bg-slate-900/20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold md:text-4xl text-slate-800 dark:text-white">Top Indian Destinations</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Click any iconic destination to instantly plan an executable trip.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => onExploreClick && onExploreClick(item.name)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all"
            >
              <div className="aspect-[4/5] w-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-5 w-full">
                <h3 className="text-2xl font-bold text-white drop-shadow-md">{item.name}</h3>
                <p className="text-sm font-medium text-slate-200 opacity-90">{item.subtitle}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Explore;
