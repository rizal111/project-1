import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Button,
  Typography,
  List,
  ListItem,
  DialogTitle,
  Dialog,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

const ChangeLanguage = () => {
  const langs = {
    en: { name: "English" },
    may: { name: "Malay" },
  };

  const { i18n } = useTranslation();
  const initLang = i18n.language;
  console.log(i18n.language);

  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(langs[initLang].name);

  const handleClose = () => {};

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setCurrentLang(langs[lang].name);
    setOpen(false);
  };

  return (
    <div>
      <Button
        color="secondary"
        onClick={() => setOpen(true)}
        startIcon={<LanguageIcon />}
      >
        <Typography>{currentLang}</Typography>
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Set Language</DialogTitle>
        <List sx={{ pt: 0 }}>
          {Object.keys(langs).map((lang) => (
            <ListItem
              button
              onClick={() => handleLanguageChange(lang)}
              key={lang}
            >
              {langs[lang].name}
            </ListItem>
          ))}
        </List>
      </Dialog>
    </div>
  );
};

export default ChangeLanguage;
