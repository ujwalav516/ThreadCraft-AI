"use client";

import { Icon } from "@iconify/react";

export default function AnimatedIcon({ icon, size = 42 }) {
  return (
    <div className="feature-icon">
      <Icon
        icon={icon}
        width={size}
        height={size}
      />
    </div>
  );
}