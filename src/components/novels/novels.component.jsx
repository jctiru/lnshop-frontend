import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectNovels } from "../../redux/novel/novel.selectors";
import NovelCard from "../novel-card/novel-card.component";

const Novels = ({ novels }) => {
  return (
    <div className="container">
      <div className="row">
        {novels.map(novel => (
          <NovelCard key={novel.lightNovelId} novel={novel} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  novels: selectNovels
});

export default connect(mapStateToProps)(Novels);
