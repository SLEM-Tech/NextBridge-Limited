import React from "react";
import {
  FiShoppingCart,
  FiTool,
  FiMonitor,
  FiTruck,
} from "react-icons/fi";

const services = [
  {
    id: 1,
    title: "Shop for latest computers",
    description:
      "powerful, sleek, and cutting-edge, built to elevate your productivity.",
    icon: FiShoppingCart,
    iconColor: "text-primary-100",
    iconBg: "bg-primary-100/10",
  },
  {
    id: 2,
    title: "Request for help for maintenance",
    description:
      "our team is ready to provide fast, reliable support to fix issues and keep your equipment running smoothly.",
    icon: FiTool,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
  {
    id: 3,
    title: "Buy software",
    description:
      "Buy software that empowers productivity, enhances security.",
    icon: FiMonitor,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
  {
    id: 4,
    title: "Get your product delivered to you",
    description:
      "fast, safe, and hassle-free, bringing convenience and quality right to you.",
    icon: FiTruck,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50",
  },
];

const OurServices = () => {
  return (
    <section className="w-full py-12 sm:py-16 px-4">
      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-10">
        What we do
      </h2>

      {/* Dark Navy Container */}
      <div className="max-w-[900px] mx-auto bg-brand-navy rounded-2xl p-4 sm:p-6 md:p-8">
        {/* White Inner Card */}
        <div className="bg-white rounded-xl p-6 sm:p-8 md:p-10">
          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.id} className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`shrink-0 size-12 rounded-lg ${service.iconBg} flex items-center justify-center`}>
                    <Icon className={`text-xl ${service.iconColor}`} />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col">
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
