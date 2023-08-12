import React, {
  ClipboardEventHandler,
  FC,
  FormEvent,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
} from 'react';

import Alert from '../Alert';
import ClickAwayListener from '../ClickAwayListener';
import { EMOJI_REPLACEMENT } from '~/constants';
import GifIcon from '../Icon/GifIcon';
import GifPicker from './GifPicker';
import ReplyIcon from '../Icon/ReplyIcon';
import StickerIcon from '../Icon/StickerIcon';
import StickerPicker from './StickerPicker';
import { useParams } from 'react-router-dom';
import { Icon, Spinner } from 'zmp-ui';
import { useRecoilState } from 'recoil';
import { userProfileState } from '~/adapters/store/atoms/user';
import { useSocketService } from '~/adapters/app-service/socket.service';

const Picker = lazy(() => import('./EmojiPicker'));

interface InputSectionProps {
  disabled: boolean;
  setInputSectionOffset?: (value: number) => void;
  replyInfo?: any;
  setReplyInfo?: (value: any) => void;
}

const InputSection: FC<InputSectionProps> = ({
  disabled,
  setInputSectionOffset,
  replyInfo,
  setReplyInfo,
}) => {
  const [inputValue, setInputValue] = useState('');

  const [previewFiles, setPreviewFiles] = useState<string[]>([]);

  const [isStickerPickerOpened, setIsStickerPickerOpened] = useState(false);
  const [isIconPickerOpened, setIsIconPickerOpened] = useState(false);
  const [isGifPickerOpened, setIsGifPickerOpened] = useState(false);

  const [isAlertOpened, setIsAlertOpened] = useState(false);
  const [alertText, setAlertText] = useState('');

  const { conversationId } = useParams();
  const [currentUser] = useRecoilState(userProfileState);

  const socketService = useSocketService();

  const textInputRef = useRef<HTMLInputElement>(null);

  const updateTimestamp = () => {
    // TODO: update message
    // updateDoc(doc(db, 'conversations', conversationId as string), {
    //   updatedAt: serverTimestamp(),
    // });
  };

  useEffect(() => {
    const handler = () => {
      textInputRef.current?.focus();
    };
    window.addEventListener('focus', handler);
    return () => window.removeEventListener('focus', handler);
  }, []);

  useEffect(() => {
    textInputRef.current?.focus();
  }, [conversationId]);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    setInputValue('');

    let replacedInputValue = ` ${inputValue} `;

    Object.entries(EMOJI_REPLACEMENT).map(([key, value]) => {
      value.forEach((item) => {
        replacedInputValue = replacedInputValue
          .split(` ${item} `)
          .join(` ${key} `);
      });
    });

    setReplyInfo && setReplyInfo(null);

    const newMessage = {
      sender: currentUser?.uid,
      token: currentUser?.accessToken,
      conversationId,
      content: replacedInputValue.trim(),
      type: 'text',
      createdAt: Date.now(),
      replyTo: replyInfo?.id || null,
    };

    socketService.sendMessage('message', newMessage);
    updateTimestamp();
  };

  const sendSticker = (url: string) => {
    // TODO: update message

    const newMessage = {
      sender: currentUser?.uid,
      token: currentUser?.accessToken,
      conversationId,
      content: url,
      type: 'sticker',
      createdAt: Date.now(),
    };
    socketService.sendMessage('message', newMessage);
    // addDoc(
    //   collection(db, 'conversations', conversationId as string, 'messages'),
    //   {
    //     sender: currentUser?.uid,
    //     content: url,
    //     type: 'sticker',
    //     createdAt: serverTimestamp(),
    //   }
    // );

    updateTimestamp();
  };

  const addIconToInput = (value: string) => {
    const start = textInputRef.current?.selectionStart as number;
    const end = textInputRef.current?.selectionEnd as number;
    const splitted = inputValue.split('');
    splitted.splice(start, end - start, value);
    setInputValue(splitted.join(''));
  };

  const handleReplaceEmoji = (e: any) => {
    if (e.key === ' ') {
      if (e.target.selectionStart !== e.target.selectionEnd) return;

      const lastWord = inputValue
        .slice(0, e.target.selectionStart)
        .split(' ')
        .slice(-1)[0];

      if (lastWord.length === 0) return;

      Object.entries(EMOJI_REPLACEMENT).map(([key, value]) => {
        value.forEach((item) => {
          if (item === lastWord) {
            const splitted = inputValue.split('');
            splitted.splice(
              e.target.selectionStart - lastWord.length,
              lastWord.length,
              key
            );
            setInputValue(splitted.join(''));
          }
        });
      });
    }
  };

  const sendGif = (url: string) => {
    const newMessage = {
      sender: currentUser?.uid,
      token: currentUser?.accessToken,
      conversationId,
      content: url,
      type: 'image',
      createdAt: Date.now(),
    };
    socketService.sendMessage('message', newMessage);
  };

  useEffect(() => {
    if (!setInputSectionOffset) return;
    if (previewFiles.length > 0) return setInputSectionOffset(128);

    if (!!replyInfo) return setInputSectionOffset(76);

    setInputSectionOffset(0);
  }, [previewFiles.length, replyInfo]);

  const handlePaste: ClipboardEventHandler<HTMLInputElement> = (e) => {
    const file = e?.clipboardData?.files?.[0];
    if (!file || !file.type.startsWith('image')) return;

    const url = URL.createObjectURL(file);

    setPreviewFiles([...previewFiles, url]);
  };

  return (
    <>
      <div
        className={`border-dark-lighten flex h-16 items-stretch gap-1 border-t px-8 ${
          disabled ? 'pointer-events-none select-none' : ''
        }`}
      >
        <div className="relative flex flex-shrink-0 items-center">
          {isStickerPickerOpened && (
            <StickerPicker
              setIsOpened={setIsStickerPickerOpened}
              onSelect={sendSticker}
            />
          )}
          <button
            onClick={() => setIsStickerPickerOpened(true)}
            className="flex items-center"
          >
            <Icon icon="zi-file" />
          </button>
        </div>

        <div className="relative flex flex-shrink-0 items-center">
          {isGifPickerOpened && (
            <GifPicker setIsOpened={setIsGifPickerOpened} onSelect={sendGif} />
          )}

          <button
            onClick={() => setIsGifPickerOpened(true)}
            className="flex items-center"
          >
            {/* <GifIcon /> */}
            <Icon icon="zi-photo" />
          </button>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className="flex flex-grow items-stretch gap-1"
        >
          <div className="relative flex flex-grow items-center">
            <input
              maxLength={1000}
              disabled={disabled}
              ref={textInputRef}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onKeyDown={handleReplaceEmoji}
              onPaste={handlePaste}
              className="bg-dark-lighten h-9 w-full rounded-full pl-3 pr-10 outline-none"
              type="text"
              placeholder="Message..."
            />
            <button
              type="button"
              onClick={() => setIsIconPickerOpened(true)}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <i className="bx bxs-smile text-primary text-2xl"></i>
            </button>

            {isIconPickerOpened && (
              <ClickAwayListener
                onClickAway={() => setIsIconPickerOpened(false)}
              >
                {(ref) => (
                  <div ref={ref} className="absolute bottom-full right-0">
                    <Suspense
                      fallback={
                        <div className="flex h-[357px] w-[348px] items-center justify-center rounded-lg border-2 border-[#555453] bg-[#222222]">
                          <Spinner />
                        </div>
                      }
                    >
                      <Picker
                        onSelect={(emoji: any) => addIconToInput(emoji.native)}
                      />
                    </Suspense>
                  </div>
                )}
              </ClickAwayListener>
            )}
          </div>
          <button className="text-primary flex flex-shrink-0 items-center text-2xl">
            <i className="bx bxs-send"></i>
            <Icon icon="zi-send-solid" />
          </button>
        </form>
      </div>

      <Alert
        isOpened={isAlertOpened}
        setIsOpened={setIsAlertOpened}
        text={alertText}
        isError
      />
    </>
  );
};

export default InputSection;
