import React from "react";
import PropTypes from "prop-types";

interface Props {
  embedId: string;
}

const YoutubeEmbed = ({ embedId }: Props) => (
  <div className="flex justify-center">
    <iframe
      src={`https://www.youtube.com/embed/${embedId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
      className="aspect-video w-full max-w-2xl rounded-lg"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
