import Tag from "./Tag";
import { ExperienceGallery } from "./ExperienceGallery";

export function ExperienceCard({
  org,
  title,
  location,
  period,
  oneLiner,
  bullets = [],
  tags = [],
  imageDir,
  imageCount
}) {
  return (
    <div className="experienceCard">
      <ExperienceGallery dir={imageDir} count={imageCount} />

      <div className="experienceText">
        <div className="experienceHeader">
          <div className="experienceTitle">{title}</div>
          <div className="experienceOrg">{org}</div>
          <div className="experienceMeta">
            {location} • {period}
          </div>
        </div>

        {bullets.length > 0 && (
          <p className="experienceParagraph">
            {bullets.join(" ")}
          </p>
        )}

        {tags.length > 0 && (
          <div className="tagRow tagRow--bottom">
            {tags.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
